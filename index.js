import TelegramAPi from 'node-telegram-bot-api'
import config from 'config'

const token = config.get('token')

const bot = new TelegramAPi(token, {polling: true})

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
