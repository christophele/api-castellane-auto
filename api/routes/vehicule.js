const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
	connection.query('SELECT * FROM vehicule', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:idVehicule', (req, res, next) => {
	const idVehicule = req.params.idVehicule;
	connection.query('SELECT * FROM vehicule WHERE nuvehicule = ' + idVehicule, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const vehicule = {
        nuimmatriculation : req.body.nuimmatriculation,
        date_achat : req.body.date_achat,
        nb_km_initial : req.body.nb_km_initial
    };

    if (vehicule.nuimmatriculation && vehicule.date_achat && vehicule.nb_km_initial) {
        connection.query('INSERT INTO vehicule (nuimmatriculation, date_achat, nb_km_initial) values (' + "'" + vehicule.nuimmatriculation + "'" + "," + "'" + vehicule.date_achat + "'" + "," + "'" + vehicule.nb_km_initial + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Véhicule ajouté",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});

router.delete('/:idVehicule', (req, res, next) => {
	const idVehicule = req.params.idVehicule;
	if (idVehicule) {
		connection.query('DELETE FROM vehicule WHERE nuvehicule = ' + idVehicule, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "Vehicule avec l'id " + idVehicule + " supprimé.",
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
