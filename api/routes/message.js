const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
	connection.query('SELECT * FROM message', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:idMessage', (req, res, next) => {
	const idMessage = req.params.idMessage;
	connection.query('SELECT * FROM message WHERE nummess = ' + idMessage, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/', (req, res, next) => {
    const message = {
		prenom : req.body.prenom,
		nom : req.body.nom,
        email : req.body.email,
		sujet : req.body.sujet,
        message : req.body.message,
    };

    if (message.prenom && message.nom && message.email && message.sujet && message.message) {
        connection.query('INSERT INTO message (prenom, nom, email, sujet, message) values (' + "'" + message.prenom + "'" + "," + "'" + message.nom + "'" + "," + "'" + message.email + "'" + "," + "'" + message.sujet + "'" + "," + "'" + message.message + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Message ajouté",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});

router.delete('/:messageId', (req, res, next) => {
	const idMessage = req.params.messageId;
	if (idMessage) {
		connection.query('DELETE FROM message WHERE nummess = ' + idMessage, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "message avec l'id " + idMessage + " supprimé.",
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
