const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
	connection.query('SELECT * FROM lecon', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:leconId', (req, res, next) => {
	const leconId = req.params.leconId;
	connection.query('SELECT * FROM lecon WHERE nulecon = ' + leconId, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const lecon = {
        date_lecon : req.body.date_lecon,
        heure_lecon : req.body.heure_lecon,
        tarif_heure : req.body.tarif_heure
    };

    if (lecon.date_lecon && lecon.heure_lecon && lecon.tarif_heure) {
        connection.query('INSERT INTO lecon (date_lecon, heure_lecon, tarif_heure) values (' + "'" + lecon.date_lecon + "'" + "," + "'" + lecon.heure_lecon + "'" + "," + "'" + lecon.tarif_heure + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Leçon ajouté",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});

router.delete('/:leconId', (req, res, next) => {
	const leconId = req.params.leconId;
	if (leconId) {
		connection.query('DELETE FROM lecon WHERE nulecon = ' + leconId, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "Modèle avec l'id " + leconId + " supprimé.",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez un id"
		});
	}
});

module.exports = router;
