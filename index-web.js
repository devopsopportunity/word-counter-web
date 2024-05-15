// index-web.js
/*
Autore: Edoardo Sabatini (Data Worker)
Programmatore: ChatGPT 3.5 (Node.js Developer)
Data: 15 maggio 2024
*/

const http = require('http');
const fs = require('fs');

// Funzione per stampare in debug se la modalità debug è attiva
function printDebug(...args) {
  if (isDebug) {
    console.log('DEBUG:', ...args);
  }
}

// Variabile globale per controllare se la modalità debug è attivata
let isDebug = false;

// Funzione per controllare se l'opzione di debug è stata attivata
function checkDebugMode() {
  isDebug = process.argv.includes('--debug');
}

// Funzione per elaborare il file con un callback
function processFile(filePath, callback) {
  // Ottieni il nome del file
  const fileName = filePath.split('/').pop();

  // Stampa per confermare l'inizio del processo di elaborazione del file
  printDebug(`Elaborazione del file ${fileName} in corso...`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    // Stampa per confermare il completamento della lettura del file
    printDebug(`Lettura del file ${fileName} completata.`);
    printDebug(`Contenuto del file ${fileName} letto:`, data);

    const words = data.match(/\b\w+\b/g);
    const totalWords = words.length;
    const totalLetters = data.replace(/\s/g, '').length;
    const totalSpaces = data.split(' ').length - 1;

    // Stampa per confermare il conteggio delle parole, delle lettere e degli spazi
    printDebug(`Conteggio delle parole, delle lettere e degli spazi del file ${fileName} completato:`);
    printDebug(`Numero totale di parole nel file ${fileName}:`, totalWords);
    printDebug(`Numero totale di lettere nel file ${fileName}:`, totalLetters);
    printDebug(`Numero totale di spazi nel file ${fileName}:`, totalSpaces);

    // Stampa per confermare le parole estratte dal testo
    printDebug(`Parole estratte dal testo del file ${fileName}: [`, words.join(', '), `]`);
    // console.log('Parole estratte dal testo:', words);

    const wordCountMap = {};
    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      wordCountMap[lowercaseWord] = (wordCountMap[lowercaseWord] || 0) + 1;
    });

    // Stampa per confermare la creazione della mappa delle frequenze delle parole
    printDebug(`Creazione della mappa delle frequenze delle parole del file ${fileName} completata.`);
    printDebug(`Mappa delle frequenze delle parole del file ${fileName}:`, wordCountMap);

    const repeatedWords = [];
    for (const word in wordCountMap) {
      if (wordCountMap[word] > 10) {
        repeatedWords.push(`${word}: ${wordCountMap[word]} volte`);
      }
    }

    // Stampa per confermare il completamento della ricerca delle parole ripetute
    printDebug(`Ricerca delle parole ripetute del file ${fileName} completata.`);
    printDebug(`Parole che si ripetono più di 10 volte nel file ${fileName}:`);
    repeatedWords.forEach(word => printDebug(word));

    callback(null, { fileName, totalWords, totalLetters, totalSpaces, repeatedWords });
  });
}

// Funzione per avviare il server web
function startWebServer() {
  const server = http.createServer((req, res) => {
    // Controllo se la richiesta è per l'homepage o per l'elaborazione dei dati
    if (req.url === '/' && req.method === 'GET') {
      // Servi la pagina HTML dell'interfaccia utente
      fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Errore nel caricamento della pagina HTML.');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url === '/analyze' && req.method === 'POST') {
      // Ricevi i dati dal form e elaborali
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const filePath = body.split('=')[1];
        processFile(filePath, (err, result) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Errore nella lettura del file: ' + err.message);
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
      });
    } else {
      // Gestisci richieste non supportate
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Pagina non trovata.');
    }
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server web in esecuzione sulla porta ${PORT}`);
  });
}

// Presentazione iniziale con suggerimento per l'opzione di debug
console.log('Benvenuto! Questo programma conta le parole in un file.');
checkDebugMode(); // Controlla se la modalità debug è attiva
if (isDebug) {
  console.log('DEBUG: Modalità di debug attivata.');
} else {
  console.log('Per attivare la modalità debug, esegui il comando con l\'opzione --debug.');
}

// Avvia il server web
startWebServer();

