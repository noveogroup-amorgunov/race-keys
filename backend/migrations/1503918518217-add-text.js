require('dotenv-extended').load();
require('./utils');

const { Text } = require('../app/models');

const fields = {
    text: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.\n\nDeclarative views make your code more predictable and easier to debug.',
    source: 'https://facebook.github.io/react/'
};

exports.up = async (next) => {
    await Text.create(fields);
    next();
};

exports.down = (next) => {
    next();
};
