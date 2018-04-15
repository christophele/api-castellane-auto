DROP DATABASE IF EXISTS castellaneauto;

CREATE DATABASE IF NOT EXISTS castellaneauto;

USE castellaneauto;

CREATE TABLE IF NOT EXISTS mois(
    numois INT(11) AUTO_INCREMENT,
    annee DATE,
    PRIMARY KEY (numois)
);

CREATE TABLE IF NOT EXISTS vehicule(
    nuvehicule INT(11) AUTO_INCREMENT,
    nuimmatriculation VARCHAR(20),
    date_achat DATE,
    nb_km_initial INTEGER(11),
    PRIMARY KEY (nuvehicule)
);

INSERT INTO vehicule (nuimmatriculation, date_achat, nb_km_initial) VALUES
    ('ES-3Y8-A4', '2015-11-20', 1089),
    ('EU-2Y1-A6', '2013-04-30', 1324),
    ('ES-185-HH', '2014-06-12', 1231),
    ('WW-979-JE', '2012-10-10', 968),
    ('DW-001-01', '2009-03-23', 5234),
    ('KZ-650-75', '2016-02-12', 123);

CREATE TABLE IF NOT EXISTS lecon(
    nulecon INT(11) AUTO_INCREMENT,
    date_lecon DATE,
    heure_lecon TIME,
    tarif_heure FLOAT,
    PRIMARY KEY (nulecon)
);

INSERT INTO lecon (date_lecon, heure_lecon, tarif_heure) VALUES
    ('2015-11-20', '20:00:00', 54.5),
    ('2013-04-30', '20:00:00', 54.5),
    ('2014-06-12', '20:00:00', 54.5),
    ('2012-10-10', '20:00:00', 54.5),
    ('2009-03-23', '20:00:00', 54.5),
    ('2016-02-12', '20:00:00', 54.5);

CREATE TABLE IF NOT EXISTS client(
    nuclient INT(11) AUTO_INCREMENT,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    adresse VARCHAR(50),
    date_de_naissance DATE,
    telephone VARCHAR(10),
    email VARCHAR(100),
    mdp VARCHAR(255),
    PRIMARY KEY (nuclient)
);

INSERT INTO client (nom, prenom, adresse, date_de_naissance, telephone, email, mdp) VALUES
    ('LE', 'Christophe', '23 villa d\'este', '1990-10-09', '0880102030', 'le_christophe@hotmail.fr', 'azerty');

CREATE TABLE IF NOT EXISTS modele(
    numodele INT(11),
    marque VARCHAR(50),
    nom VARCHAR(50),
    annee DATE,
    PRIMARY KEY (numodele)
);

INSERT INTO modele (marque, nom, annee) VALUES
    ('Kawasaki', 'H2', '2015-06-25'),
    ('Lamborghini', 'Aventador Roadster', '2017-09-03'),
    ('Lamborghini', 'Aventador', '2017-07-19'),
    ('Mercedes-Benz', 'AMG S 65', '2017-01-02'),
    ('Mercedes-Benz', 'AMG S 63', '2017-01-05'),
    ('Kawasaki', 'H2R', '2016-03-12'),
    ('Mercedes-Benz', 'AMG G 65', '2015-11-20');

CREATE TABLE IF NOT EXISTS moniteur(
    numoniteur INT(11) AUTO_INCREMENT,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    date_embauche DATE,
    email VARCHAR(60),
    mdp VARCHAR(255),
    PRIMARY KEY (numoniteur)
);

INSERT INTO moniteur (nom, prenom, date_embauche, email, mdp) VALUES
    ('LE', 'Christophe', '1990-10-09', 'cleadmin@hotmail.fr', 'azerty');

CREATE TABLE IF NOT EXISTS rouler(
    numois INT(2) NOT NULL,
    nuvehicule INT(10) NOT NULL,
    nb_km_parcourus_dans_le_mois INT(8),
    PRIMARY KEY (numois, nuvehicule),
    FOREIGN KEY (numois) REFERENCES mois(numois),
    FOREIGN KEY (nuvehicule) REFERENCES vehicule(nuvehicule)
);

CREATE TABLE IF NOT EXISTS utiliser(
    nulecon INTEGER(2) NOT NULL,
    nuvehicule INTEGER(10) NOT NULL,
    PRIMARY KEY (nulecon, nuvehicule),
    FOREIGN KEY (nulecon) REFERENCES lecon(nulecon),
    FOREIGN KEY (nuvehicule) REFERENCES vehicule(nuvehicule)
 );

CREATE TABLE IF NOT EXISTS planning(
    nulecon INTEGER(2) NOT NULL,
    nuclient INTEGER(10) NOT NULL,
    numoniteur INTEGER(10) NOT NULL,
    numodele INTEGER(10) NOT NULL,
    date_heure_debut TIME,
    date_heure_fin TIME,
    PRIMARY KEY (nulecon, nuclient, numoniteur, numodele),
    FOREIGN KEY (nulecon) REFERENCES lecon(nulecon),
    FOREIGN KEY (nuclient) REFERENCES client(nuclient),
    FOREIGN KEY (numoniteur) REFERENCES moniteur(numoniteur),
    FOREIGN KEY (numodele) REFERENCES modele(numodele)
 );

INSERT INTO planning (date_heure_debut, date_heure_fin) VALUES
    ('10:00:00', '11:00:00');
