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
    const email = req.body.email;
    const mdp = sha1(req.body.mdp);
    if (email && mdp) {
        connection.query('SELECT * FROM client WHERE email = ' + "'" + email + "'" + ' and mdp = ' + "'" + mdp + "'", (err, data) => {
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

router.post('/', (req, res, next) => { // INSCRIPTION
    const client = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        date_de_naissance: req.body.date_de_naissance,
        telephone: req.body.telephone,
        email: req.body.email,
        mdp: sha1(req.body.mdp)
    };

    if (client.nom && client.prenom && client.adresse && client.date_de_naissance && client.telephone && client.email && client.mdp) {
        connection.query('INSERT INTO client (nom, prenom, adresse, date_de_naissance, telephone, email, mdp) values ('
        + "'" + client.nom + "'" + ","
        + "'" + client.prenom + "'" + ","
        + "'" + client.adresse + "'" + ","
        + "'" + client.date_de_naissance + "'" + ","
        + "'" + client.telephone + "'" + ","
        + "'" + client.email + "'" + ","
        + "'" + client.mdp + "'" + ")", (err, data) => {
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

router.get('/:clientId', (req, res, next) => {
    const idClient = req.params.clientId;
    connection.query('SELECT * FROM client WHERE idClient = ' + idClient, (err, data) => {
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
        connection.query('DELETE FROM client WHERE idClient = ' + idClient, (err, data) => {
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
