require('dotenv-extended').load();
require('./utils');

const { Text } = require('../app/models');

const texts = [{
    text: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.',
    source: 'https://facebook.github.io/react/'
}, {
    text: 'He had discovered, in the course of his reading, two schools of fiction. One treated of man as a god, ignoring his earthly origin; the other treated of man as a clod, ignoring his heaven-sent dreams and divine possibilities. Both the god and the clod schools erred, in Martin\'s estimation, and erred through too great singleness of sight and purpose.',
    source: 'Martin Eden, Jack London (Chapter 27)'
}, {
    text: 'The light was beginning to fade and he clenched his fist in excitement as he heard the notes of wailing horns carried to him on the breeze. The great column was halting for the night. One of his scouts came to a skidding stop by him, panting as he too stretched out.',
    source: 'Some enlish text'
}, {
    text: 'Steve lifted his head and Molly thought that she might have gotten his attention, but then she noticed that a shadow had come over the entrance to the cave. She looked up to see half a dozen people in choir robes standing at the opening of the cathedral.',
    source: 'Some enlish text'
}, {
    text: 'The update craft should have fled, should have engaged in evasive maneuvers to avoid even a small Jihad warship. If the robot captain carried an update of the computer evermind, his programming would command him to protect the silvery gelsphere at all costs.',
    source: 'Some enlish text'
}, {
    text: 'When the tide was low enough the children and Timothy set off over the rocks to the wreck. They clambered up and stood on the slanting, slippery deck. They looked towards the locker where the little trunk had stood. The door of the locker was shut this time.',
    source: 'Some enlish text'
}, {
    text: 'Monk scrambled erect, looked at what was left of the ceiling. A stone slab moved aside with a scraping noise. Then a pair of hands appeared. The hands held a masonry block. The block was slightly less than eighteen inches square. If it had been any larger, it wouldn\'t have worked at all.',
    source: 'Some enlish text'
}, {
    text: 'George says all that proves is that there was a lot of ice on Ganymede to start with and that if we hadn\'t had mass converters we could never have colonized it. Sometimes I think engineers get so matter of fact that they miss a lot of the juice in life.',
    source: 'Some enlish text'
}, {
    text: 'A hundred yards ahead, towering oaks closed over the road, turning it into a shadowy tunnel. When we entered it, I rolled down my window and leaned out again. First I saw nothing but branches. Then I caught a silver gleam as the plane swooped over the road behind us at about two thousand feet.',
    source: 'Some enlish text'
}, {
    text: 'The male silver was in the lead when they felt the first probe in their direction. A presence was nearby, reaching out with magic to detect outsiders. The probe was no more than a momentary contact with their minds, but it was enough to send the entire group into an abrupt halt.',
    source: 'Some enlish text'
}];

exports.up = async (next) => {
    await Promise.all(texts.map(async (textData) => {
        await Text.create(textData);
    }));
    next();
};

exports.down = async (next) => {
    await Text.remove({});
    next();
};
