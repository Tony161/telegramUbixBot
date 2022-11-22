const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();
const Tick = require('tick-tock'),
    tock = new Tick();
const createHeartBeatMessage = require('./utils/createHeartBeatMessage');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;
const heartbeat = `${process.env.PING_INTERVAL_IN_MIN} minutes`;
const heartbeatMessage = createHeartBeatMessage();
let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.HOST_URL + bot.token);
} else {
    bot = new TelegramBot(token, {polling: true});
}

bot.on('message', msg => {
    commands = ['/start'];
    const {
        text,
        message_id,
        chat: {id},
        from: {username}
    } = msg;

    if (text === '/start') {
        bot.sendMessage(
            id,
            `Hello ${username}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`
        );
    } else {
        const html = `<strong>Thank your for the interest ${username}, we'll contact you soon! Feel free to ask any question in our telegram channel: </strong>`;
        bot.sendMessage(id, html, {parse_mode: 'HTML'}).then(() => bot.forwardMessage(chatId, id, message_id));
    }
});

tock.setInterval(
    'poolBot',
    () => bot.sendChatAction(chatId, 'typing').then(() => bot.sendMessage(chatId, heartbeatMessage)),
    heartbeat
);

bot.on('polling_error', () => {
    tock.clear();
});
bot.on('webhook_error', () => {
    tock.clear();
});

module.exports = bot;
