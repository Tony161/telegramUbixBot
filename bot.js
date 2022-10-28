const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

let fl = 0
let bot;


// if production env, we use webhooks
// https://core.telegram.org/bots/api#setwebhook
// https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#TelegramBot+setWebHook
if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
  console.log('**** BOT initiated ***** ');
} else {
  // otherwise, we use polling
  // differences between webhooks and polling:
  // https://core.telegram.org/bots/webhooks
  // https://stackoverflow.com/questions/40033150/telegram-bot-getupdates-vs-setwebhook
  bot = new TelegramBot(token, { polling: true });
}

console.log(`Bot started in the ${process.env.NODE_ENV} mode`);

bot.on('message', async (msg) => {
  commands = ['/start', '/help'];
  const {text, chat: {id}} = msg

 if (text === '/start') {
    await bot.sendMessage(id, `Hello ${msg.from.first_name}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`)
  }

  if (msg.text !== '/start') {
    fl = 1
   }

  if (fl) {
    fl = 0
  const html = `<strong>Thank your for the interest ${msg.from.first_name}, we'll contact you soon! Feel free to ask any question in our telegram channel:</strong>
        <a href='https://t.me/+q8tzqV5TCmw4NTA6'>testChannel</a>`

   // await bot.sendMessage(id, html, {parse_mode: 'HTML'})
    await bot.createChatInviteLink('https://t.me/+q8tzqV5TCmw4NTA6', Date.now()+ 3600000)
  }
});

module.exports = bot;