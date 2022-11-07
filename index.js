const dotenv = require('dotenv')
 dotenv.config();
const bot= require('./bot.js')
const express= require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the UBIX Bot API.' });
});
// TELEGRAM WEBHOOK - https://core.telegram.org/bots/api#setwebhook
app.post(`/${process.env.TELEGRAM_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.status(200).json({ message: 'ok' });
});

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
