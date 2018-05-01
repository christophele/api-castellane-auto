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
	connection.query('SELECT * FROM lecon WHERE numlecon = ' + leconId, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const lecon = {
        datelecon : req.body.datelecon,
        heurelecon : req.body.heurelecon,
        tarifheure : req.body.tarifheure
    };

    if (lecon.datelecon && lecon.heurelecon && lecon.tarifheure) {
        connection.query('INSERT INTO lecon (datelecon, heurelecon, tarifheure) values (' + "'" + lecon.datelecon + "'" + "," + "'" + lecon.heurelecon + "'" + "," + "'" + lecon.tarifheure + "'" + ")", (err, data) => {
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
		connection.query('DELETE FROM lecon WHERE numlecon = ' + leconId, (err, data) => {
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
