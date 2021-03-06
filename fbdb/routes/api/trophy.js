var express = require('express');
var router = express.Router();
var db = require('../../lib/db')

/* GET all rows */
router.get('/trophies', function(req, res, next){
    var sql = `
        SELECT idTrophy as id, season as season, team as t_id, league as l_id
        FROM fbdb.team_trophies;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get trophies."
            });
        }
        
        res.status(200).json(result);
    });
});

/* GET single row */
router.get('/trophies/:id', function(req, res, next){
    var sql = `
        SELECT idTrophy as id, season as season, team as t_id, league as l_id
        FROM fbdb.team_trophies
        WHERE idTrophy = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get trophy."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

/* POST team */
router.post('/trophies', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.team_trophies(season, team, league)
        VALUES(?, ?, ?);
    `;

    db.query(sql, [req.body.season, req.body.team, req.body.league], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to add trophy.',
            });
        } 
        createLog(req, 'CREATE');
        res.status(200).json({
            success: 'Trophy added successfully!'
        });   
    })
})

/* DELETE team */
router.delete('/trophies/:id', function(req, res, next){
    var sql = `
        DELETE FROM fbdb.team_trophies
        WHERE idTrophy = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if(error){
            res.status(404).json({
                error: 'Failed to delete trophy.',
            });
        }
        createLog(req, 'DELETE');
        res.status(201).json({
            success: 'Trophy deleted successfully!'
        });
    });
});

/* UPDATE team */
router.put('/trophies/:id', function(req, res, next){
    var sql = `
        UPDATE fbdb.team_trophies
        SET season = ?, team = ?, league = ?
        WHERE idTrophy = ?;
    `;

    db.query(sql, [req.body.season, req.body.team, req.body.league, req.body.id], function(error, result){
        if(error){    
            console.log(error);
            res.status(404).json({
                error: 'Failed to update trophy.'
            });
        } 
        createLog(req, 'UPDATE');
        res.status(201).json({
            success: 'Trophy updated successfully!'
        });  
    });
})

function createLog(req, operation) {
    if (!req.user) return;

    var log = {
        user: req.user.idUser,
        related_table: 'trophy',
        operation: operation,
        date: new Date()
    }

    var sql = `
        INSERT INTO fbdb.log(user, related_table, operation, date)
        VALUES (?, ?, ?, ?);
    `

    db.query(sql, [log.user, log.related_table, log.operation, log.date], function(error, result){
        if (error) return;
    });
}

module.exports = router;