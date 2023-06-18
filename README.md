# MSPR-BDD-B3
# Projet de Mise en situation professionnel reconstituée:
    - Equipe de 4 personnes :  - Rémi RYCKEBUSCH
                               - Gaêtan TIBERGHIEN
                               - Kévin MAKHLOUFI
                               - Enzo VANDEVELDE
                               
# Contexte
La société A’rosa-je a besoin d’une application web pour rendre son service disponible en ligne.
Son service possède deux composants : la mise en relation de clients afin qu’ils gardent les plantes des uns et des autres durant leurs absences ainsi que la prédication de conseils d'experts botanistes sur l'entretien de plantes.
# Installation
## Pré-requis
Un ou trois serveurs équipés du docker daemon.
## Installation Rapide : architecture uni-serveur
*Ce guide est prévu pour tout type d'informaticien*

Récuperez l'application
```
git clone https://github.com/JRedxs/MSPR-BDD-B3.git
```
Ouvrez le dossier MSPR-BDD-B3
```
cd MSPR-BDD-B3
```

Ecrire un fichier .env avec de véritable crédentials
```
ROOT_PASSWORD=admin
DATABASE=Arosaje_db
USER=admin
PASSWORD=admin
PORT=3306
REACT_APP_API_URL="http://127.0.0.1:8005"
```

Ouvrer le dossier des sources du serveur Backend
```
cd MSPR-BDD-B3-Backend/back/src
```

Créer un secret 
```
python
imports secrets
secrets.token_hex(32)
```

Ecrire un fichier .env avec de véritable crédentials
```
SECRET = "<Votre Secret !>"
ALGORITHM = 'HS256'


HOST_LOCAL = "localhost"
HOST_CONTAINER = "mysql-db-compose"
USER_LOCAL = "admin"
USER_CONTAINER = "admin"
PASSWORD_LOCAL = "admin"
PASSWORD_CONTAINER = "admin"
DB_LOCAL = "Arosaje_db"
DB_CONTAINER = "Arosaje_db"
PORT_LOCAL = 3306
PORT_CONTAINER = 3306
```

Retourner à la racine du dossier
```
cd ../../..
```

Activez la stack docker
```
docker-compose up -d
```
## Installation Personnalisée : archtecture tri-serveurs
*Ce guide est prévu pour un informaticien Opérateurs*

Réccuperez l'application
```
git clone https://github.com/JRedxs/MSPR-BDD-B3.git
```

Créer un secret 
```
python
imports secrets
secrets.token_hex(32)
```

Ecrire un fichier .env dans MSPR-BDD-B3-Backend/back/src avec de véritable crédentials
```
SECRET = "<Votre Secret !>"
ALGORITHM = 'HS256'


HOST_LOCAL = "localhost"
HOST_CONTAINER = "mysql-db-compose"
USER_LOCAL = "admin"
USER_CONTAINER = "admin"
PASSWORD_LOCAL = "admin"
PASSWORD_CONTAINER = "admin"
DB_LOCAL = "Arosaje_db"
DB_CONTAINER = "Arosaje_db"
PORT_LOCAL = 3306
PORT_CONTAINER = 3306
```

Personnalisez l'url de l'API au sein du fichier MSPR-BDD-B3-WebApp/front/Dockerfile

Personnalisez les crédentials du fichier MSPR-BDD-B3-MySQL/Dockerfile

Montez les trois images grâce aux Dockerfiles disponible aux emplacements:
* MSPR-BDD-B3-Backend/Dockerfile
* MSPR-BDD-B3-MySQL/Dockerfile
* MSPR-BDD-B3-WebAPP/front/Dockerfile

Enregistrez les trois images dans votre gestionnaire d'image

Deployez les conteneurs sur vos serveurs, un par serveur

# Fonctionnalitées
## Authentification des utilisateurs
Login des clients et des botanistes
## Enregistrement de nouveau client
Formulaire d'inscription
## Enregistrement de plantesgraphie
Formulaire et première photographie
## Parcourt des plantes
Cartes informatives et dernières photographies
## Consultation d'une plantes
Galerie des photographies et carte informative
## Enregistrement de photographie
Prise de nouvelle photographie pour une plante donnée
## Enregistrement de conseil
Ajout d'un conseil informatif à une photographie
## Enregistrement de garde
Formulaire
## Parcourt des gardes possible
Carte du monde avec marqueurs
## Acceptation d'une garde
Carte informative
## Consultation du profil utilisateur
Carte informative
## Changement du mot de passe
Formulaire
