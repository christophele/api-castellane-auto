const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
	connection.query('SELECT * FROM modele', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:idModele', (req, res, next) => {
	const idModele = req.params.idModele;
	connection.query('SELECT * FROM modele WHERE numodele = ' + idModele, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const modele = {
        marque : req.body.marque,
        nom : req.body.nom,
        annee : req.body.annee
    };

    if (modele.marque && modele.nom && modele.annee) {
        connection.query('INSERT INTO modele (marque, nom, annee) values (' + "'" + modele.marque + "'" + "," + "'" + modele.nom + "'" + "," + "'" + modele.annee + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Modèle ajouté",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});

router.delete('/:idModele', (req, res, next) => {
	const idModele = req.params.idModele;
	if (idModele) {
		connection.query('DELETE FROM modele WHERE numodele = ' + idModele, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "Modèle avec l'id " + idModele + " supprimé.",
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
