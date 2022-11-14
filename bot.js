const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  commands = ['/start'];
  const {text,  message_id, chat: {id}, from:{username }} = msg

 if (text === '/start') {
    await bot.sendMessage(id, `Hello ${username}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`)
  } else {
     const html = `<strong>Thank your for the interest ${username}, we'll contact you soon! Feel free to ask any question in our telegram channel: </strong>`
     await bot.sendMessage(id, html, {parse_mode: 'HTML'})
     await bot.forwardMessage(chatId ,id,  message_id)
 }
});

module.exports = bot;