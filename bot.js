const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')
dotenv.config();

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0'
});

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
  commands = ['/start', '/location'];
  const {text, chat: {id}, from:{first_name, username }} = msg

 if (text === '/start') {
    await bot.sendMessage(id, `Hello ${username}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`)
  }

  if (text !== '/start' && text !== '/location') {
   fl = 1
 }

  if (text === '/location') {
   await bot.sendLocation(msg.chat.id, 47.210848, 38.922911);
    // const opts = {
    //   reply_markup: JSON.stringify({
    //     keyboard: [
    //       [{text: 'Location', request_location: true}],
    //       [{text: 'Contact', request_contact: true}],
    //     ],
    //     resize_keyboard: true,
    //     one_time_keyboard: true,
    //   }),
    // };
    // await bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
    // await bot.sendMessage(msg.chat.id, "Removing keyboard")

  }

  if (fl) {
    fl = 0
  const html = `<strong>Thank your for the interest ${username}, we'll contact you soon! Feel free to ask any question in our telegram channel:</strong>
        <a href='https://t.me/+q8tzqV5TCmw4NTA6'>testChannel</a>`

    await bot.sendMessage(id, html, {parse_mode: 'HTML'})
  }
});

// bot.onText(/location/, (msg) => {
//   const opts = {
//     reply_markup: JSON.stringify({
//       keyboard: [
//         [{text: 'Location', request_location: true}],
//         [{text: 'Contact', request_contact: true}],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: false,
//     }),
//   };
//   bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
// });

bot.on('location', (msg) => {
  console.log("msg", msg)
  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (!err) {
      console.log("resultss", response.json.results);
    }
  });

});

module.exports = bot;