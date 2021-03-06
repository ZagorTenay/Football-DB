var express = require('express');
var router = express.Router();
var db = require('../lib/db');


router.get('/', function(req, res, next){
    res.render('league', {
        title: 'Leagues',
    });
});

router.get('/:id/teams', function(req, res, next){
    var sql = `
    SELECT name as l_name
    FROM fbdb.league
    WHERE idLeague = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get league."
            });
        }
        
        res.render('league_teams', {
            title: "Teams - " + result[0].l_name,
        });
    });
});

router.get('/:id/teams/league_name', function(req, res, next){
    var sql = `
    SELECT name as l_name
    FROM fbdb.league
    WHERE idLeague = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get league name."
            });
        }
        res.status(200).json(result[0]);
    });
});

/*GET teams of the desired league*/
router.get('/:id/teams/list', function(req, res, next){
    var sql = `
    select team_name as s_tname, team_id as s_tid, played as s_played, won as s_won, drawn as s_drawn, lost as s_lost, f as s_for, a as s_against, gd as s_gd, points as s_points, league as s_lid 
    from fbdb.view_standings 
    where league = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get league name."
            });
        }
        res.status(200).json(result);
    });
});

/*GET teams of the desired league
router.get('/:id/teams/list', function(req, res, next){

    var sqlTeam = `
    SELECT idTeam as t_id, name as t_name
    FROM fbdb.team
    WHERE league = ?; 
    `;
    
    db.query(sqlTeam, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }

        var table = {};

        for (let i = 0; i < result.length; i++) {
            table[result[i].t_id] = [];
            table[result[i].t_id].push(result[i].t_name); 
            for (let j = 0; j < 8; j++){
                table[result[i].t_id].push(0); 
            }
            table[result[i].t_id].push(result[i].t_id);   
        }

        var sqlMatch = `
        SELECT homeScore as home_s, homeTeam as home_t, awayScore as away_s, awayTeam as away_t
        from fbdb.match
        where season = 2018 and league = ?;
        `;

        db.query(sqlMatch, [req.params.id], function(error, result){
            if (error) {
                res.status(404).json({
                    error: "Failed to get teams."
                });
            }

            for (let i = 0; i < result.length; i++) {

                table[result[i].home_t][1] += 1;
                table[result[i].away_t][1] += 1;

                table[result[i].home_t][5] += result[i].home_s;
                table[result[i].home_t][6] += result[i].away_s;

                table[result[i].away_t][5] += result[i].away_s;
                table[result[i].away_t][6] += result[i].home_s;

                table[result[i].away_t][7] = table[result[i].away_t][5] - table[result[i].away_t][6];
                table[result[i].home_t][7] = table[result[i].home_t][5] - table[result[i].home_t][6];
                
                if(result[i].home_s > result[i].away_s)
                {
                    table[result[i].home_t][8] += 3;
                    table[result[i].home_t][2] += 1;
                    table[result[i].away_t][4] += 1;
                }
                else if(result[i].home_s < result[i].away_s)
                {
                    table[result[i].away_t][8] += 3;
                    table[result[i].away_t][2] += 1;
                    table[result[i].home_t][4] += 1;
                }
                else
                {
                    table[result[i].home_t][8] += 1;
                    table[result[i].away_t][8] += 1;
                    table[result[i].home_t][3] += 1;
                    table[result[i].away_t][3] += 1;
                }
                
            }
            res.status(200).json(table);
        });

    });   
    
});*/

/* GET leagues list. */
router.get('/list', function(req, res, next){ // league logosu eklenebilir
    var sql = `
    SELECT L.idLeague as l_id, L.name as l_name, C.flag as c_flag 
    FROM fbdb.league as L, fbdb.country as C 
    WHERE L.country=C.idCountry;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET leagues match history. */
router.get('/:id/teams/match_history', function(req, res, next){ // league logosu eklenebilir
    var sql = `
    SELECT m.round as m_round, ht.name as m_htname, m.homeScore as m_hscore, m.awayScore as m_ascore, awt.name as m_atname, m.homeTeam as m_homeid, m.awayTeam as m_awayid
    FROM fbdb.match as m, fbdb.team as ht, fbdb.team as awt
    WHERE ht.idTeam = m.homeTeam and awt.idTeam = m.awayTeam and m.season = 2018 and m.league = ?
    ORDER BY round ASC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get matches."
            });
        }
        
        res.status(200).json(result);
    });
});

module.exports = router;