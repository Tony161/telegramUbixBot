import TelegramBot  from 'node-telegram-bot-api';
import * as dotenv from 'dotenv'
dotenv.config();
import request from 'request';
import express from 'express';

const app = express();
console.log(process.env.BOT_API_KEY)
const bot = new TelegramBot(process.env.BOT_API_KEY, { polling: true });

let fl = 0

bot.on('message', async msg => {
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

    await bot.sendMessage(id, html, {parse_mode: 'HTML'})
  }
})

// bot.onText(/\/movie (.+)/, (msg, match) => {
//   let movie = match[1];
//   let chatId = msg.chat.id;
//   request(`http://www.omdbapi.com/?apiKey=${process.env.OMD_API_KEY}=${movie}`, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//
//       // bot.sendMessage(chatId, '_Looking for _' + movie + '...', { parse_mode: 'Markdown' })
//       //   .then((msg) => {
//       //     let res = JSON.parse(body);
//       //     bot.sendPhoto(chatId, res.Poster, { caption: 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released + '\nRuntime: ' + res.Runtime + '\nGenre: ' + res.Genre + '\nDirector: ' + res.Director + '\nPlot: ' + res.Plot })
//       //       .catch((err) => {
//       //         if (err) {
//       //           bot.sendMessage(chatId, 'Error in finding,Check the movie title');
//       //         }
//       //       })
//       //   })
//
//
//     }
//   })
// })

// bot.onText(/\/about (.+)/, (msg, match) => {
//   if (match[1]) {
//     let chatId = msg.chat.id;
//     bot.sendMessage(chatId,
//       `finder bot\nbot where you can search for a movie and get details about it.`, { parse_mode: 'Markdown' });
//   }
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
