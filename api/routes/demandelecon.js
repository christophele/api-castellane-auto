const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
	connection.query('SELECT * FROM demandelecon', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const demandelecon = {
		datelecon : req.body.datelecon,
		heurelecon : req.body.heurelecon,
		mailclient : req.body.mailclient
    };

    if (demandelecon.datelecon && demandelecon.heurelecon && demandelecon.mailclient) {
        connection.query('INSERT INTO demandelecon (datelecon, heurelecon, mailclient) values (' + "'" + demandelecon.datelecon + "'" + "," + "'" + demandelecon.heurelecon + "'" + "," + "'" + demandelecon.mailclient + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "demande envoyée",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});

router.delete('/:demandeleconId', (req, res, next) => {
	const idDemandelecon = req.params.demandeleconId;
	if (idDemandelecon) {
		connection.query('DELETE FROM demandelecon WHERE id_demande = ' + idDemandelecon, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "demandelecon avec l'id " + idDemandelecon + " supprimé.",
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
