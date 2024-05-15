#!/bin/bash

# Costruzione dell'immagine Docker
echo "Creazione dell'immagine Docker..."
docker build -t word-counter:latest .

# Avvio del container Docker con l'immagine appena creata
echo "Avvio del server web Docker..."
docker run -d -p 3000:3000 word-counter:latest

# Informazione sull'URL di accesso
echo "Puoi accedere al server web all'indirizzo: http://localhost:3000/"

# Suggerimento per fermare il server
echo "Per fermare il server, esegui 'docker stop CONTAINER_ID' dove CONTAINER_ID è l'ID del container attivo."

