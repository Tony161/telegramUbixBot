const TelegramBot = require('node-telegram-bot-api');
const Tick = require('tick-tock');
const tock = new Tick();

let bot;

if (process.env.NODE_ENV !== 'development') {
    bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
    bot.setWebHook(process.env.HOST_URL + bot.token);
} else {
    const dotenv = require('dotenv');
    dotenv.config();
    bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
}

const chatId = process.env.CHAT_ID;
const heartbeatInterval = +process.env.PING_INTERVAL_IN_MIN;

const getWelcomeMessage = username =>
    `Hello ${username}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`;

const getThanksMessage = username =>
    `<strong>Thank your for the interest ${username}, we'll contact you soon!</strong>`;

const getHeartBeatMessage = interval => {
    let days, hours = Math.floor(interval / 60);
    const minutes = interval % 60;
    if (hours > 24) {
        days = Math.floor(hours / 24);
        hours = hours % 24;
    }

    const daysString = !days ? '' : days > 2 ? `${days} days ` : `${days} day `;
    const hoursString = !hours ? '' : hours > 1 ? `${hours} hours ` : `${hours} hour `;
    const minutesString = !minutes ? '' : minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;

    return `Bot heartbeat, ones per: ${daysString}${hoursString}${minutesString}`;
};


bot.on('message', msg => {
    commands = ['/start'];
    const {
        text,
        message_id,
        chat: {id},
        from: {username}
    } = msg;

    if (text === '/start') {
        bot.sendMessage(id, getWelcomeMessage(username));
    } else {
        bot.sendMessage(id, getThanksMessage(username), {parse_mode: 'HTML'}).then(() =>
            bot.forwardMessage(chatId, id, message_id)
        );
    }
});

tock.setInterval(
    'ubixNetworkBot',
    () => bot.sendMessage(chatId, getHeartBeatMessage(heartbeatInterval)),
    `${heartbeatInterval} minutes`
);

bot.on('polling_error', () => {
    tock.clear();
});
bot.on('webhook_error', () => {
    tock.clear();
});

module.exports = bot;
