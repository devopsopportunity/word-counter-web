const { processFile } = require('./index');

describe('processFile', () => {
  test('should read file and count words, letters, and spaces correctly', () => {
    // Precondizioni: Utilizza il file test.txt come input
    const filePath = 'test.txt';

    // Esegui la funzione da testare
    processFile(filePath, (err, result) => {
      // Postcondizioni: Verifica che i risultati siano corretti
      expect(result.totalWords).toBe(156);
      expect(result.totalLetters).toBe(792);
      expect(result.totalSpaces).toBe(145);
    });
  });

  test('should find words repeated more than 10 times', () => {
    // Precondizioni: Utilizza il file test_10_parole.txt come input
    const filePath = 'test_10_parole.txt';

    // Esegui la funzione da testare
    processFile(filePath, (err, result) => {
      // Postcondizioni: Verifica che i risultati siano corretti
      expect(result.repeatedWords.length).toBe(1);
      expect(result.repeatedWords[0]).toBe('onde: 11 volte');
    });
  });

  // Aggiungi altri test per gli altri scenari qui
});

