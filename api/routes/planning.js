const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM vue_planning', (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.get('/:clientId', (req, res, next) => {
    const clientId = req.params.clientId;
    connection.query('SELECT * FROM planning WHERE numclient = ' + clientId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});

router.post('/', (req, res, next) => {
    const planning = {
        numclient : req.body.numclient,
        numvehicule : req.body.numvehicule,
        numlecon : req.body.numlecon,
        nummoniteur : req.body.nummoniteur,
        etatplanning : req.body.etatplanning,
        datelecon_p : req.body.datelecon_p,
        heuredebut : req.body.heuredebut,
        heurefin : req.body.heurefin
    };

    if (planning.numclient && planning.numvehicule && planning.numlecon && planning.nummoniteur && planning.etatplanning && planning.datelecon_p && planning.heuredebut && planning.heurefin) {
        connection.query('INSERT INTO planning (numclient, numvehicule, numlecon, nummoniteur, etatplanning, datelecon_p, heuredebut, heurefin) values (' + "'" + planning.numclient + "'" + "," + "'" + planning.numvehicule + "'" + "," + "'" + planning.numlecon + "'" + "," + "'" + planning.nummoniteur + "'" + "," + "'" + planning.etatplanning + "'" + "," + "'" + planning.datelecon_p + "'" + "," + "'" + planning.heuredebut + "'" + "," + "'" + planning.heurefin + "'" + ")", (err, data) => {
            if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Planning mis à jour",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez des données"
		});
	}
});

router.delete('/:planningId', (req, res, next) => {
	const planningId = req.params.planningId;
    console.log(planningId);
	if (planningId) {
		connection.query('DELETE FROM planning WHERE numlecon = ' + planningId, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(200).json({
				message: "Lecon avec l'id " + planningId + " supprimé.",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Entrez un id"
		});
	}
});

// INSERT INTO planning (numclient, numvehicule, numlecon, nummoniteur, etatplanning, datelecon_p, heuredebut, heurefin)
// values (154, 1, 10, 7, 'Confirmé', '2018-05-20', '10:00', '11:00');
module.exports = router;
