const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');
const sha1 = require('sha1');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM client', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.post('/connexion', (req, res, next) => { // CONNEXION
    const mailclient = req.body.mailclient;
    const mdpclientclient = sha1(req.body.mdpclientclient);
    if (mailclient && mdpclient) {
        connection.query('SELECT * FROM client WHERE mailclient = ' + "'" + mailclient + "'" + ' and mdpclient = ' + "'" + mdpclient + "'", (err, data) => {
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

router.post('/inscription', (req, res, next) => { // INSCRIPTION
    const client = {
        nomclient: req.body.nomclient,
        prenomclient: req.body.prenomclient,
        adresseclient: req.body.adresseclient,
        datedenaissanceclient: req.body.datedenaissanceclient,
        telephoneclient: req.body.telephoneclient,
        mailclient: req.body.mailclient,
        mdpclient: sha1(req.body.mdpclient)
    };

    if (client.nomclient && client.prenomclient && client.adresseclient && client.datedenaissanceclient && client.telephoneclient && client.mailclient && client.mdpclient) {
        connection.query('INSERT INTO client (nomclient, prenomclient, adresseclient, datedenaissanceclient, telephoneclient, mailclient, mdpclient) values ('
        + "'" + client.nomclient + "'" + ","
        + "'" + client.prenomclient + "'" + ","
        + "'" + client.adresseclient + "'" + ","
        + "'" + client.datedenaissanceclient + "'" + ","
        + "'" + client.telephoneclient + "'" + ","
        + "'" + client.mailclient + "'" + ","
        + "'" + client.mdpclient + "'" + ")", (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({code: "no", message: "Erreur lors de l'inscription", err});
            } else {
                res.status(201).json({message: "Client ajouté", data});
            }
        });
    } else {
        res.status(500).json({code: "no", message: "Entrez des identifiants"});
    }
});

router.post('/', (req, res, next) => {
    const client = {
        nomclient: req.body.nomclient,
        prenomclient: req.body.prenomclient,
        adresseclient: req.body.adresseclient,
        datedenaissanceclient: req.body.datedenaissanceclient,
        telephoneclient: req.body.telephoneclient,
        mailclient: req.body.mailclient,
        dateinscriptionclient: req.body.dateinscriptionclient,
        typeclient: req.body.typeclient,
        mdpclient : req.body.mdpclient
    };

    console.log(client);

    if (client.nomclient && client.prenomclient && client.adresseclient && client.datedenaissanceclient && client.telephoneclient && client.mailclient && client.dateinscriptionclient && client.typeclient && client.mdpclient) {
        connection.query('INSERT INTO client (nomclient, prenomclient, adresseclient, datedenaissanceclient, telephoneclient, mailclient, dateinscriptionclient, typeclient, mdpclient) values (' + "'" + client.nomclient + "'" + "," + "'" + client.prenomclient + "'" + "," + "'" + client.adresseclient + "'" + "," + "'" + client.datedenaissanceclient + "'" + "," + "'" + client.telephoneclient + "'" + "," + "'" + client.mailclient + "'" + "," + "'" + client.dateinscriptionclient + "'" + "," + "'" + client.typeclient + "'" + "," + "'" + client.mdpclient + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Client ajouté",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des identifiants"
		});
	}
});


router.get('/:clientId', (req, res, next) => {
    const idClient = req.params.clientId;
    connection.query('SELECT * FROM client WHERE numclient = ' + idClient, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.delete('/:clientId', (req, res, next) => {
    const idClient = req.params.clientId;
    if (idClient) {
            connection.query('DELETE FROM client WHERE numclient = ' + idClient, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({err});
            }
            res.status(200).json({
                message: "Client avec l'id " + idClient + " supprimé.",
                data
            });
        });
    } else {
        res.status(500).json({message: "Entrez un id"});
    }
});

module.exports = router;
