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
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{text: 'Location', request_location: true}],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    };
    await bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);

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

// bot.once( "location"

bot.on('location', async (msg) => {
  console.log('location', msg.location)
  await bot.InputLocationMessageContent(msg.chat.id, "Removing keyboard")

  const {latitude, longitude } = msg.location
  await bot.sendLocation(msg.chat.id, latitude, longitude, {proximity_alert_radius: 1000} )

  // horizontal_accuracy	Float number	Optional. The radius of uncertainty for the location, measured in meters; 0-1500
  // live_period	Integer	Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
  // heading	Integer	Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
  //   proximity_alert_radius	Integer	Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
  //   reply_markup	InlineKeyboardMarkup	Optional. Inline keyboard attached to the message
  // input_message_content	InputMessageContent	Optional. Content of the message to be sent instead of the location
  // thumb_url	String	Optional. Url of the thumbnail for the result
  // thumb_width	Integer	Optional. Thumbnail width
  // thumb_height	Integer	Optional. Thumbnail height
  //
  // InputLocationMessageContent
  // Represents the content of a location message to be sent as the result of an inline query.
  //
  //   Field	Type	Description
  // latitude	Float	Latitude of the location in degrees
  // longitude	Float	Longitude of the location in degrees
  // horizontal_accuracy	Float number	Optional. The radius of uncertainty for the location, measured in meters; 0-1500
  // live_period	Integer	Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
  // heading	Integer	Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
  //   proximity_alert_radius	Integer

  // latitude	Float	Latitude of the location in degrees
  // longitude	Float	Longitude of the location in degrees
  // horizontal_accuracy	Float number	Optional. The radius of uncertainty for the location, measured in meters; 0-1500
  // live_period	Integer	Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
  // heading	Integer	Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
  //   proximity_alert_radius	Integer
});

module.exports = bot;