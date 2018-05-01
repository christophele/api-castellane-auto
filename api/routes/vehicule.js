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
	connection.query('SELECT * FROM vehicule WHERE numvehicule = ' + idVehicule, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const vehicule = {
		numvehicule : req.body.numvehicule,
		marque : req.body.marque,
		immatriculation : req.body.immatriculation,
		model : req.body.model,
        date_achat : req.body.date_achat,
    };

    if (vehicule.numvehicule && vehicule.marque && vehicule.immatriculation && vehicule.model && vehicule.date_achat) {
        connection.query('INSERT INTO vehicule (numvehicule, marque, immatriculation, model, date_achat) values (' + "'" + vehicule.numvehicule + "'" + "," + "'" + vehicule.marque + "'" + "," + "'" + vehicule.immatriculation + "'" + "," + "'" + vehicule.model + "'" + "," + "'" + vehicule.date_achat + "'" + ")", (err, data) => {
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

router.delete('/:vehiculeId', (req, res, next) => {
	const idVehicule = req.params.vehiculeId;
	if (idVehicule) {
		connection.query('DELETE FROM vehicule WHERE numvehicule = ' + idVehicule, (err, data) => {
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
