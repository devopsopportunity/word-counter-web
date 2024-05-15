/*
Autore: Edoardo Sabatini (Data Worker)
Programmatore: ChatGPT 3.5 (Node.js Developer)
Data: 15 maggio 2024
*/

const readline = require('readline');
const fs = require('fs');

// Variabile globale per controllare se la modalità debug è attivata
let isDebug = false;

// Funzione per controllare se l'opzione di debug è stata attivata
function checkDebugMode() {
  isDebug = process.argv.includes('--debug');
}

// Design Pattern: Callback
// Callback è un pezzo di codice eseguibile passato come argomento a un altro codice,
// che si aspetta di richiamare (eseguire) l'argomento in un momento opportuno.

// Funzione per elaborare il file con un callback
function processFile(filePath, callback) {
  // Stampa per confermare l'inizio del processo di elaborazione del file
  printDebug('Elaborazione del file in corso...');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    // Stampa per confermare il completamento della lettura del file
    printDebug('Lettura del file completata.');
    printDebug('Contenuto del file letto:', data);

    const words = data.match(/\b\w+\b/g);
    const totalWords = words.length;
    const totalLetters = data.replace(/\s/g, '').length;
    const totalSpaces = data.split(' ').length - 1;

    // Stampa per confermare il conteggio delle parole, delle lettere e degli spazi
    printDebug('Conteggio delle parole, delle lettere e degli spazi completato:');
    printDebug('Numero totale di parole nel file:', totalWords);
    printDebug('Numero totale di lettere nel file:', totalLetters);
    printDebug('Numero totale di spazi nel file:', totalSpaces);

    // Stampa per confermare le parole estratte dal testo
    printDebug('Parole estratte dal testo: [', words.join(', '), ']');
    // console.log('Parole estratte dal testo:', words);

    const wordCountMap = {};
    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      wordCountMap[lowercaseWord] = (wordCountMap[lowercaseWord] || 0) + 1;
    });

    // Stampa per confermare la creazione della mappa delle frequenze delle parole
    printDebug('Creazione della mappa delle frequenze delle parole completata.');
    printDebug('Mappa delle frequenze delle parole:', wordCountMap);

    const repeatedWords = [];
    for (const word in wordCountMap) {
      if (wordCountMap[word] > 10) {
        repeatedWords.push(`${word}: ${wordCountMap[word]} volte`);
      }
    }

    // Stampa per confermare il completamento della ricerca delle parole ripetute
    printDebug('Ricerca delle parole ripetute completata.');
    printDebug('Parole che si ripetono più di 10 volte:');
    repeatedWords.forEach(word => printDebug(word));

    callback(null, { totalWords, totalLetters, totalSpaces, repeatedWords });
  });
}

// Funzione per stampare in debug se la modalità debug è attiva
function printDebug(...args) {
  if (isDebug) {
    console.log('DEBUG:', ...args);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Presentazione iniziale con suggerimento per l'opzione di debug
console.log('Benvenuto! Questo programma conta le parole in un file.');
checkDebugMode(); // Controlla se la modalità debug è attiva
if (isDebug) {
  console.log('DEBUG: Modalità di debug attivata.');
} else {
  console.log('Per attivare la modalità debug, esegui il comando con l\'opzione --debug.');
}

// Richiesta del percorso del file
rl.question('Inserisci il percorso del file: ', (filePath) => {
  // Chiamata alla funzione processFile con un callback
  processFile(filePath, (err, result) => {

    // Stampa per confermare l'avvio della callback
    printDebug('Chiamo il Design Pattern Callback...');

    if (err) {
      console.error('Errore nella lettura del file:', err);
      return rl.close();
    }

    // Stampa dei risultati ottenuti
    console.log('Numero totale di parole nel file:', result.totalWords);
    console.log('Numero totale di lettere nel file:', result.totalLetters);
    console.log('Numero totale di spazi nel file:', result.totalSpaces);

    // Stampa delle parole che si ripetono più di 10 volte
    if (result.repeatedWords.length > 0) {
      console.log('Parole che si ripetono più di 10 volte:');
      result.repeatedWords.forEach(word => console.log(word));
    } else {
      console.log('Nessuna parola si ripete più di 10 volte.');
    }

    rl.close();
  });
});
module.exports = { processFile };

