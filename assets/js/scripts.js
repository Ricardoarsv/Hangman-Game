  // Palabras predefinidas
  var words = ['GATO', 'PERRO', 'CASA', 'AUTO', 'SOL', 'ARBOL', 'LAPIZ', 'COCHE', 'COMPUTADORA'];
  
  // Variables globales
  var selectedWord = '';
  var hiddenWord = [];
  var guessedLetters = [];
  var errors = 0;
  var maxErrors = 6;
  
  // Función para reiniciar el juego
  function startGame() {
    // Reiniciar variables
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = new Array(selectedWord.length).fill('_');
    guessedLetters = ["Letras Ingresadas:", ];
    errors = 0;

    // Mostrar la palabra oculta
    updateWordContainer();

    // Limpiar mensaje
    showMessage('');

    // Reiniciar imagen del ahorcado
    resetHangmanImage();
  }
    
  // Función para adivinar una letra
  function guessLetter(letter) {
    // Verificar si la letra ya fue adivinada o si el juego ha terminado
    if (guessedLetters.includes(letter) || errors >= maxErrors) {
      return;
    }
    
    // Agregar la letra a las letras adivinadas
    guessedLetters.push(letter);
    
    // Verificar si la letra está en la palabra seleccionada
    if (selectedWord.includes(letter)) {
      // Actualizar la palabra oculta con la letra adivinada
      for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
          hiddenWord[i] = letter;
        }
      }
      
      // Verificar si se ha adivinado toda la palabra
      if (!hiddenWord.includes('_')) {
        // Mostrar mensaje de victoria y reiniciar el juego
        showMessage('¡Has ganado! La palabra era: ' + selectedWord);
      }
    } else {
      // Incrementar el contador de errores
      errors++;
      
      // Actualizar la imagen del ahorcado
      updateHangmanImage();
      
      // Verificar si se ha alcanzado el máximo de errores permitidos
      if (errors >= maxErrors) {
        // Mostrar mensaje de derrota y reiniciar el juego
        showMessage('¡Has perdido! La palabra era: ' + selectedWord);
        setTimeout(startGame, 2000);
      }
    }
    
    // Actualizar la palabra oculta y las letras adivinadas
    updateWordContainer();
    updateGuessedLetters();
  }
  
  // Función para actualizar el contenedor de la palabra oculta
  function updateWordContainer() {
    var wordContainer = document.querySelector('.word-container');
    wordContainer.textContent = hiddenWord.join(' ');
  }
  
  // Función para actualizar las letras adivinadas
  function updateGuessedLetters() {
    var guessedLettersContainer = document.querySelector('.guessed-letters');
    guessedLettersContainer.textContent = guessedLetters.join(' ');
  }
  
  // Función para mostrar un mensaje
  function showMessage(message) {
    var messageContainer = document.querySelector('.message');
    messageContainer.textContent = message;
  }
  
      // Función para reiniciar la imagen del ahorcado
    function resetHangmanImage() {
      var hangmanImage = document.querySelector('.hangman-image');
      hangmanImage.style.backgroundImage = "url('hangman.png')";
    }
    
    // Función para actualizar la imagen del ahorcado
    function updateHangmanImage() {
      var hangmanImage = document.querySelector('.hangman-image');
      var imagePath = 'hangman_' + errors + '.png';
      hangmanImage.style.backgroundImage = "url('" + imagePath + "')";
    }
    
    // Iniciar el juego al cargar la página
    window.onload = startGame;