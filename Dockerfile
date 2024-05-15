# Usa un'immagine di Node.js come base
FROM node:latest

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il codice sorgente nell'immagine
COPY . .

# Installa le dipendenze
RUN npm install

# Definisci il comando di avvio dell'applicazione per index-web.js
CMD ["node", "index-web.js"]

