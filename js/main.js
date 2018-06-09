document.addEventListener('DOMContentLoaded', function() {
  // Variables
  var colorGeneration = 256;
  var colors = [];

  // Random selection of the right answer and the number of colors
  var pickedHard = 6;
  var pickedEasy = 3;
  var pickedColor;
  // A regular expression for delegating an event on a container
  var regSquare = new RegExp('click','g');
  var regComplexity = new RegExp('active','g');
  // The color that the user chooses
  var clickedColor;

  // The DOM elements 
  var scuares = document.querySelectorAll('.square');
  var container = document.querySelector('.container');
  var rgbColorDisplay = document.querySelector('.rgb-color');
  var guessAnswer = document.querySelector('.guess-answer');
  var colorExample = document.querySelector('.color-example');
  var newColors = document.querySelector('.new-colors');
  var hardColors = document.querySelector('.hard');
  var easyColors = document.querySelector('.easy');


  // Functions

  // Generating an array of colors depending on the level of complexity
  function generColor(quantity) {
    for (var i = 0; i < quantity; i++) {
      var item = 'rgb(' + (Math.floor(Math.random() * colorGeneration)) + ', '
                        + (Math.floor(Math.random() * colorGeneration)) + ', '
                        + (Math.floor(Math.random() * colorGeneration)) + ')';
      colors.push(item);
    }
    // Reset all items
    container.innerHTML = '';

    // Answer color
    pickedColor = colors[Math.floor(Math.random() * quantity)];
  }

  // Assigning colors to DOM
  function assignСolors(quantity) {

    for (var i = 0; i < quantity; i++) {
      // Add Colors to an Item
      scuares[i].style.backgroundColor = colors[i];

      // Set event marker
      scuares[i].classList.remove('click');
      scuares[i].classList.add('click');

      // Assigning colors to DOM
      container.appendChild(scuares[i]);
    }

    rgbColorDisplay.textContent = pickedColor;
  }

  // Resetting the correct answer text, h1 color and array of colors
  function throwState() {
    guessAnswer.textContent = '';
    colorExample.style.backgroundColor = 'rgb(70,130,180)';
    colors = [];
  }

  // With the right answer
  function correctAnswer() {
    // Print the text
    guessAnswer.textContent = 'Correct!';
    
    // Assign Color to Title
    colorExample.style.backgroundColor = pickedColor;

    // Assign color to other elements
    for (var i = 0; i < scuares.length; i++) {
      scuares[i].style.backgroundColor = pickedColor;
    }
  }

  // With a wrong answer
  function uncorrectAnswer() {
    // Print the text
    guessAnswer.textContent = 'Try Again';

    // Assign a color to the wrong item and remove the event marker from it
    element.style.backgroundColor = 'rgb(44, 44, 44)';
    element.classList.remove('click');

    // After 500 ms clear text
    setTimeout(function() {
      guessAnswer.textContent = '';
    }, 500);
  }

  function init() {

    // Generating an array of colors
    generColor(pickedHard);

    // Assign colors
    assignСolors(pickedHard);

    // New colors
    newColors.addEventListener('click', function() {

      // Depending on the selected mode, we generate colors
      if(hardColors.className.match(regComplexity)) {

        throwState();

        generColor(pickedHard);
        assignСolors(pickedHard);

      } else {

        throwState();

        generColor(pickedEasy);
        assignСolors(pickedEasy);
      }
    });

    // Mode selection, complicated
    hardColors.addEventListener('click', function() {

      // If this mode is selected, then do not regenerate
      if(!hardColors.className.match(regComplexity)) {
        throwState();

        generColor(pickedHard);
        assignСolors(pickedHard);

        easyColors.classList.remove('active');
        hardColors.classList.add('active');
      }
    });

    // Выбор режима легкий
    easyColors.addEventListener('click', function() {

      // If this mode is selected, then do not regenerate
      if(!easyColors.className.match(regComplexity)) {
        throwState();

        generColor(pickedEasy);
        assignСolors(pickedEasy);

        hardColors.classList.remove('active');
        easyColors.classList.add('active');
      }
    });

    // Listen to the user's response
    container.addEventListener('click', function(e) {
      element = e.target;

      // Check the item on which the user clicked
      // If it is an element with the class square, then we work with it
      if(element.className.match(regSquare)) {

        // Assign the color of the variable element
        clickedColor = element.style.backgroundColor;

        // Check if the color of the answer and question is the same
        if(clickedColor === pickedColor) {

          // With the right answer
          correctAnswer();

        } else {

          // If not the right answer
          uncorrectAnswer();
        }
      }
    });
  }

  init();
});

