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

Réccuperez l'application
```
git clone https://github.com/JRedxs/MSPR-BDD-B3.git
```
Ouvrez le dossier MSPR-BDD-B3
```
cd MSPR-BDD-B3
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
Personnalisez l'url de la base de donnée au sein du fichier MSPR-BDD-B3-Backend/back/src/database.py

Personnalisez l'url de l'API au sein du fichier MSPR-BDD-B3-WebApp/front/Dockerfile


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