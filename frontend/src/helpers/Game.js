function getNewCarPosition(data) {
    data.currentPosition += data.step;
    return `${+data.currentPosition}px`;
}

class Game {
    constructor(options) {
        this.selectors = {
            $car: options.car,
            $text: options.text,
            $race: options.race,
            $error: options.error,
        };
        this.callbacks = options.callbacks;
        this.reset();

        /*
        makeErrorInText: this.props.makeErrorInText,
        movingForward: this.props.movingForward,
        finishRace: this.props.finishRace,
        clearInput: this.clearInput,
        displayErrorText: this.displayErrorText,
        */
    }

    reset() {
        const sourceText = this.selectors.$text.innerText;
        const raceLengthInPx = this.selectors.$race.offsetWidth - 120;

        this.selectors.$text.innerHTML = this.selectors.$text.innerText;

        this.callbacks.clearInput();
        this.selectors.$car.style.left = 0;

        this.data = {
            currentPosition: 0,
            currentIndex: 0,
            currentChunkIndex: 0,
            errors: [],
            speed: 0,
            chunks: sourceText.split(' ').map(a => a + ' '),
            step: raceLengthInPx / sourceText.length,
            sourceText,
            textLength: sourceText.length,
        };
    }

    userEnterNewChar(char) {
        const { $text } = this.selectors;
        const data = this.data;

        if (data.chunks[data.currentChunkIndex][data.currentIndex] === char) {
            this.callbacks.displayErrorText(false);
            if (data.currentChunkIndex === data.chunks.length - 1 && data.currentIndex === data.chunks[data.currentChunkIndex].length - 2) {
                highlightCompletedChunks($text, data.sourceText, data.chunks, data.currentChunkIndex);
                this.callbacks.clearInput();
                this.callbacks.finishRace();
                return;
            }

            if (char === ' ') {
                highlightCompletedChunks($text, data.sourceText, data.chunks, data.currentChunkIndex);
                this.callbacks.clearInput();
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
            this.callbacks.displayErrorText(true);
        }
        return false;
    }
}

export default Game;

/*
<button class="start">start</button>
<div class="text"><span></span>In an expression, you can tag entities to make them appear in the Recast.</div>
<input type="text" />
<div class="error"></div>
<div class="race">
<div class="car">
  <div class="car-body">
  </div>
</div>
</div>


.race {
  background: white;
  width: 100%;
  position: relative;
  height: 50px;
}

.car {
  background: rgb(119, 119, 119);
  overflow: hidden;
  width: 100px;
  height: 50px;
  position: relative;
  transition: opacity 0.5s;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.1s;
}

.car-body {
  background: white url('http://klavogonki.ru/img/cars/19-1.png') no-repeat;
  background: white url('http://klavogonki.ru/img/cars/35-1.png') no-repeat;
  background: white url('http://klavogonki.ru/img/cars/22-3.png') no-repeat;
  background: white url('http://klavogonki.ru/img/cars/23.png') no-repeat;
  background-color: transparent;
  height: 50px;
  width: 150px;
}

.text span {
  background-color: #f5f5ba;
}


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
