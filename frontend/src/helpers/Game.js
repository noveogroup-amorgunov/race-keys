import { EventEmitter } from 'events';
import soundFile from '../assets/sounds/typo.mp3';

class Game extends EventEmitter {
    constructor({ sourceText, position = 0 }) {
        super();
        this.data = {
            position,
            currentIndex: 0,
            currentChunkIndex: 0,
            chunks: sourceText.split(' ').map(word => `${word} `),
            sourceText,
            isError: false,
        };
        this.errorSound = new Audio(soundFile);
    }

    start() {
        if (this.data.position > 0) {
            this.processCurrentChunkAndIndex();
        }
    }

    processCurrentChunkAndIndex() {
        const data = this.data;

        const enteredText = this.data.sourceText.substr(0, this.data.position);
        this.data.currentChunkIndex = enteredText.split(' ').length - 1; // + 1;

        this.emit('highlightCompletedChunks',
            data.sourceText,
            data.chunks,
            data.currentChunkIndex - 1
        );
    }

    userEnterNewChar(char) {
        const data = this.data;
        console.log(data.currentChunkIndex + '[' + data.currentIndex + ']' + data.chunks[data.currentChunkIndex][data.currentIndex] + '===' + char);
        console.log(`data.chunks.length: ${data.chunks.length}`);
        console.log(`data.chunks[data.currentChunkIndex].length: ${data.chunks[data.currentChunkIndex].length}`);
        if (data.chunks[data.currentChunkIndex][data.currentIndex] === char) {
            this.emit('displayErrorText', false);
            data.isError = false;
            if (data.currentChunkIndex === data.chunks.length - 1 && data.currentIndex === data.chunks[data.currentChunkIndex].length - 2) {
                this.emit('highlightCompletedChunks',
                    data.sourceText,
                    data.chunks,
                    data.currentChunkIndex
                );
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

            data.position += 1;
            this.emit('movingForward', data.position);
        } else if (!data.isError) {
            data.isError = true;
            this.errorSound.play();
            this.emit('makeErrorInText');
            this.emit('displayErrorText', true);
        }
        return false;
    }
}

export default Game;
