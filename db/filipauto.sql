DROP DATABASE IF EXISTS filipauto;

CREATE DATABASE IF NOT EXISTS filipauto;

USE filipauto;

-----------------------------------------------------------------------------
--        TABLE : MOIS
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS mois(
    numois INT(11) AUTO_INCREMENT,
    annee DATE,
    PRIMARY KEY (numois)
 );


-----------------------------------------------------------------------------
--        TABLE : VEHICULE
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS vehicule(
    nuvehicule INT(11) AUTO_INCREMENT,
    code_modele INT(11),
    nuimmatriculation VARCHAR(20),
    date_achat DATE,
    nb_km_initial INTEGER(11),
    PRIMARY KEY (nuvehicule)
 );

 -- INSERT INTO vehicule (nuvehicule, code_modele, nuimmatriculation, date_achat, nb_km_initial) VALUES
 -- ("", "88126234", "ES-3Y8-A4", "2015-11-20", 1089),
 -- ("", "47147456", "EU-2Y1-A6", "2013-04-30", 1324),
 -- ("", "58331917", "ES-185-HH", "2014-06-12", 1231),
 -- ("", "34584382", "WW-979-JE", "2012-10-10", 968),
 -- ("", "32484232", "DW-001-01", "2009-03-23", 5234),
 -- ("", "01238293", "KZ-650-75", "2016-02-12", 123);

 -----------------------------------------------------------------------------
 --        TABLE : LECON
 -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lecon(
     nulecon INT(11) AUTO_INCREMENT,
     date_lecon DATE ,
     heure_lecon VARCHAR(5),
     tarif_heure FLOAT,
     PRIMARY KEY (nulecon)
);


-----------------------------------------------------------------------------
--        TABLE : CLIENT
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS client(
    nuclient INT(11) AUTO_INCREMENT,
    nom_client VARCHAR(30),
    prenom_client VARCHAR(30),
    adresse_client VARCHAR(50),
    date_de_naissance DATE,
    telephone INT(10),
    date_inscription DATE,
    mode_facturation VARCHAR(30),
    PRIMARY KEY (nuclient)
 );

-----------------------------------------------------------------------------
--        TABLE : MODELE
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS modele(
    code_modele INT(11),
    marque_modele VARCHAR(50),
    nom_modele VARCHAR(50),
    annee_modele DATE,
    PRIMARY KEY (code_modele)
 );

-- INSERT INTO modele (code_modele, marque_modele, nom_modele, annee_modele) VALUES
--     (26567214, 'Kawasaki', 'H2', '2015-06-25'),
--     (37147621, 'Lamborghini', 'Aventador Roadster', '2017-09-03'),
--     (47147456, 'Lamborghini', 'Aventador', '2017-07-19'),
--     (76854561, 'Mercedes-Benz', 'AMG S 65', '2017-01-02'),
--     (76854562, 'Mercedes-Benz', 'AMG S 63', '2017-01-05'),
--     (87964512, 'Kawasaki', 'H2R', '2016-03-12'),
--     (88126234, 'Mercedes-Benz', 'AMG G 65', '2015-11-20');


-----------------------------------------------------------------------------
--        TABLE : MONITEUR
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS moniteur(
    numoniteur INT(11) AUTO_INCREMENT,
    nom_moniteur VARCHAR(30),
    date_embauche DATE,
    email VARCHAR(60),
    password VARCHAR(255),
    PRIMARY KEY (numoniteur)
 );


-----------------------------------------------------------------------------
--        TABLE : ROULER
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rouler(
    numois INT(2) NOT NULL,
    nuvehicule INT(10) NOT NULL,
    nb_km_parcourus_dans_le_mois INT(8),
    PRIMARY KEY (numois, nuvehicule),
    FOREIGN KEY (numois) REFERENCES mois(numois),
    FOREIGN KEY (nuvehicule) REFERENCES vehicule(nuvehicule)
 );


-----------------------------------------------------------------------------
--        TABLE : UTILISER
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS utiliser(
    nulecon INTEGER(2) NOT NULL,
    nuvehicule INTEGER(10) NOT NULL,
    PRIMARY KEY (nulecon, nuvehicule),
    FOREIGN KEY (nulecon) REFERENCES lecon(nulecon),
    FOREIGN KEY (nuvehicule) REFERENCES vehicule(nuvehicule)
 );


-----------------------------------------------------------------------------
--        TABLE : PLANNING
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS planning(
    nulecon INTEGER(2) NOT NULL,
    nuclient INTEGER(10) NOT NULL,
    numoniteur INTEGER(10) NOT NULL,
    code_modele INTEGER(10) NOT NULL,
    date_heure_debut DATETIME NULL,
    date_heure_fin DATETIME NULL,
    PRIMARY KEY (nulecon, nuclient, numoniteur, code_modele),
    FOREIGN KEY (nulecon) REFERENCES lecon(nulecon),
    FOREIGN KEY (nuclient) REFERENCES client(nuclient),
    FOREIGN KEY (numoniteur) REFERENCES moniteur(numoniteur),
    FOREIGN KEY (code_modele) REFERENCES modele(code_modele)
 );
