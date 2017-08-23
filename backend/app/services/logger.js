const logger = require('winston');
const moment = require('moment');
const Slack = require('winston-slack-transport');

logger.setLevels({
    error: 0,
    warn: 1,
    notice: 2,
    info: 3,
    debug: 4
});

logger.addColors({
    error: 'red',
    warn: 'yellow',
    notice: 'green',
    info: 'cyan',
    debug: 'green'
});

const outputLevels = {
    production: 'notice',
    development: 'debug',
    test: 'error'
};

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    level: outputLevels[process.env.NODE_ENV] || 'debug',
    colorize: true,
    timestamp: () => moment().format('MM-DD-YYYY h:mm:ss.ms')
});

const env = process.env.NODE_ENV || '';
const slackWebhookUrl = process.env[`SLACK_${env.toUpperCase()}_WEBHOOK_URL`];

if (env !== 'development' && slackWebhookUrl) {
    logger.add(Slack, {
        webhook_url: slackWebhookUrl,
        channel: `#${env}-server-logs`,
        username: 'doctoconsult.bot',
        level: 'warn',
        icon_emoji: ':ghost:',
        handleExceptions: true,
        custom_formatter: (level, msg) => ({
            attachments: [{
                color: 'danger',
                title: level.toUpperCase(),
                text: msg
            }]
        })
    });
}

module.exports = logger;
