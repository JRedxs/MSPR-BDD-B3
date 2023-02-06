Use Arosaje-db;

CREATE TABLE Role(
   id_role INT NOT NULL AUTO_INCREMENT,
   description VARCHAR(550),
   PRIMARY KEY(id_role)
);

CREATE TABLE Person(
   id_person INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50),
   firstname VARCHAR(50),
   pwd VARCHAR(256),
   email VARCHAR(50),
   phone VARCHAR(20),
   latitude INT,
   longitude INT,
   id_role INT NOT NULL,
   PRIMARY KEY(id_person),
   UNIQUE(email),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Plante(
   id_plante INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50),
   number INT,
   road_first VARCHAR(200),
   road_second VARCHAR(200),
   town VARCHAR(100),
   postal_code INT,
   latitude INT,
   longitude INT,
   id_person INT NOT NULL,
   PRIMARY KEY(id_plante),
   FOREIGN KEY(id_person) REFERENCES Person(id_person)
);

CREATE TABLE Garde(
   id_garde INT NOT NULL AUTO_INCREMENT,
   begining DATE,
   finish DATE,
   id_person INT NOT NULL,
   id_plante INT NOT NULL,
   PRIMARY KEY(id_garde),
   FOREIGN KEY(id_person) REFERENCES Person(id_person),
   FOREIGN KEY(id_plante) REFERENCES Plante(id_plante)
);

CREATE TABLE Photo(
   id_photo INT NOT NULL AUTO_INCREMENT,
   advice_title VARCHAR(150),
   advice VARCHAR(550),
   id_plante INT NOT NULL,
   PRIMARY KEY(id_photo),
   FOREIGN KEY(id_plante) REFERENCES Plante(id_plante)
);

INSERT INTO `person`(`id_person`, `name`, `firstname`, `pwd`, `email`, `phone`, `latitude`, `longitude`, `id_role`) VALUES ('1','"Ryckebusch','Rémi','test','remi@remi.fr','0600000001',1.0,2.0,'1') ,('2','"MonkeyD','Luffy','viande','luffy@zoro.fr','0600000001',2.0,3.0,'2'),('3','"Napoleon','Bonaparte','Waterloo','Waterloo@1801.fr','0600000001',2.0,3.0,'3');

INSERT INTO role Values(1,'botaniste'),(2,'user'),(3,'Hybride');

INSERT INTO `plante`(`id_plante`, `name`, `number`, `road_first`, `road_second`, `town`, `postal_code`, `latitude`, `longitude`, `id_person`) VALUES ('1','Orchidee','5','rue napoleon','','Dunkerque',59140,5.0,5.1,1),('2','Rose','7','Rue de test','','Lille',59000,1.0,3.1,2),('3','Tulipe','13','rue des elements','appartement 7','Marseille',13000,1.0,3.1,3);