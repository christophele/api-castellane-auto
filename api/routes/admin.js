const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');
const sha1 = require('sha1');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM admin', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.get('/:idAdmin', (req, res, next) => {
	const idAdmin = req.params.idAdmin;
	connection.query('SELECT * FROM admin WHERE numadmin = ' + idAdmin, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/connexion', (req, res, next) => { // CONNEXION
    const mailadmin = req.body.mailadmin;
    const mdpadmin = req.body.mdpadmin;

    if (mailadmin && mdpadmin) {
        connection.query('SELECT * FROM admin WHERE mailadmin = ' + "'" + mailadmin + "'" + ' and mdpadmin = ' + "'" + mdpadmin + "'", (err, data) => {
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
