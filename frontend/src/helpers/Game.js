const EventEmitter = require('events').EventEmitter;

class Game extends EventEmitter {
    constructor({ callbacks, sourceText, data = {} }) {
        super();
        this.data = {
            currentPosition: data.currentPosition || 0,
            currentIndex: data.currentIndex || 0,
            currentChunkIndex: data.currentChunkIndex || 0,
            chunks: sourceText.split(' ').map(word => `${word} `),
            sourceText,
            isError: false,
            step: 2.59,
        };
    }

    setStep(raceLengthInPx) {
        this.data.step = raceLengthInPx / this.sourceText.length;
    }

    userEnterNewChar(char) {
        const data = this.data;

        if (data.chunks[data.currentChunkIndex][data.currentIndex] === char) {
            this.emit('displayErrorText', false);
            data.isError = false;
            if (data.currentChunkIndex === data.chunks.length - 1 && data.currentIndex === data.chunks[data.currentChunkIndex].length - 2) {
                this.emit('highlightCompletedChunks', data.sourceText, data.chunks, data.currentChunkIndex);
                this.emit('clearInput');
                this.emit('finishRace');
                return;
            }

            if (char === ' ') {
                this.emit('highlightCompletedChunks', data.sourceText, data.chunks, data.currentChunkIndex);
                this.emit('clearInput');
                data.currentChunkIndex++;
                data.currentIndex = 0;
            } else {
                data.currentIndex++;
            }

            data.currentPosition += data.step;
            this.emit('movingForward', data.currentPosition);
        } else if (!data.isError) {
            data.isError = true;
            this.emit('makeErrorInText');
            this.emit('displayErrorText', true);
        }
        return false;
    }
}

export default Game;


/*
const $input = document.querySelector('input');
const $car = document.querySelector('.car');
const $text = document.querySelector('.text');
const $race = document.querySelector('.race');
const $error = document.querySelector('.error');
const $start = document.querySelector('.start');


function span(content) {
  return '<span>' + content + '</span>';
}

function changeCarPosition($car, data) {
  data.currentPosition += data.step;
  $car.style.left = parseInt(data.currentPosition, 10) + 'px';
}

function highlightCompletedChunks($text, text, chunks, currentChunkIndex) {
  const start = 0;
  const end = chunks.slice(0, currentChunkIndex + 1).reduce((acc, item) => acc + item.length, 0);
  $text.innerHTML = text.substring(0, start) + span(text.substring(start, end)) + text.substring(end, text.length);
}

class Game {
  constructor(options) {
    this.selectors = {
      $input: options.input,
      $car: options.car,
      $text: options.text,
      $race: options.race,
      $error: options.error,
    };
    this.listener = this.listener.bind(this);
    this.reset();
  }
  
  reset() {
    const sourceText = this.selectors.$text.innerText;
    const raceLengthInPx = this.selectors.$race.offsetWidth - 120;
    
    this.selectors.$text.innerHTML = this.selectors.$text.innerText;
    
    this.selectors.$input.value = '';
    this.selectors.$car.style.left = 0;

    this.data = {
      currentPosition: 0,
      currentIndex: 0,
      currentChunkIndex: 0,
      errors: [],
      speed: 0,
      start: null,
      end: null,
      chunks: sourceText.split(' ').map(a => a + ' '),
      step: raceLengthInPx / sourceText.length,
      sourceText: sourceText,
      textLength: sourceText.length,
    };
    
    // console.log(raceLengthInPx, this.data);
    
    $input.removeEventListener('input', this.listener);
    $input.addEventListener('input', this.listener);
  }
  
  listener(e) {
    const { $input, $error, $text } = this.selectors;
    const data = this.data;
    if (!data.start) {
      data.start = Date.now();
    }
    if (e.keyCode === 8) {
      return;
    }
    const char = $input.value[$input.value.length - 1];
    //console.log(data.currentChunkIndex + '[' + data.currentIndex + ']' + data.chunks[data.currentChunkIndex][data.currentIndex] + '===' + char)
    if (data.chunks[data.currentChunkIndex][data.currentIndex] === char) {
      $error.innerText = '';
      if (data.currentChunkIndex === data.chunks.length - 1 && data.currentIndex === data.chunks[data.currentChunkIndex].length - 2) {
        console.log('end game');
        $input.value = '';
        highlightCompletedChunks($text, data.sourceText, data.chunks, data.currentChunkIndex);
        data.speed = data.textLength * 1000 * 60 / (Date.now() - data.start);
        alert('You finish! Errors: ' + data.errors.length + ', Speed: ' + data.speed.toFixed(2) + ' chars/min');
        return;
      }
      if (char === ' ') {
        highlightCompletedChunks($text, data.sourceText, data.chunks, data.currentChunkIndex);
        $input.value = '';
        data.currentChunkIndex++;
        data.currentIndex = 0;
      } else {
        data.currentIndex++;
      }
      
     
      changeCarPosition(this.selectors.$car, data);
    } else {
      if ($error.innerText === '') {
        data.errors.push('error');
      }
      $error.innerText = 'fix error!';
    }
    return false;
  }
}

const game = new Game({
  input: $input,
  car: $car,
  text: $text,
  race: $race,
  error: $error,
});

$start.addEventListener('click', function(e) {
  console.log('game reset');
  game.reset();
});

*/
