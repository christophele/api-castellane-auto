const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');
const sha1 = require('sha1');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM moniteur', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.get('/:idMoniteur', (req, res, next) => {
	const idMoniteur = req.params.idMoniteur;
	connection.query('SELECT * FROM moniteur WHERE nummoniteur = ' + idMoniteur, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/connexion', (req, res, next) => { // CONNEXION
    const mailmoniteur = req.body.mailmoniteur;
    const mdpmoniteur = sha1(req.body.mdpmoniteur);
    if (mailmoniteur && mdpmoniteur) {
        connection.query('SELECT * FROM moniteur WHERE mailmoniteur = ' + "'" + mailmoniteur + "'" + ' and mdpmoniteur = ' + "'" + mdpmoniteur + "'", (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({code: "no", message: "Erreur lors de la connexion", err});
            }
            if (data.length > 0) {
                res.status(200).json({code: "ok", data});
            } else {
                res.status(500).json({code: "no", message: "Mauvais identifiants", data});
            }
        });
    } else {
        res.status(500).json({code: "no", message: "Entrez des identifiants"});
    }
});


module.exports = router;
