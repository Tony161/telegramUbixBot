import TelegramAPi from 'node-telegram-bot-api'
import config from 'config'

const token = config.get('token') || '5567160739:AAHD-EyIN8yqM2a9YMm6NA92kkMK7Hrtd3Q'

const bot = new TelegramAPi(token, {polling: true})

let fl = 0
const start = () => {
  bot.on('message', async msg => {
    const {text, chat: {id}} = msg
    try{
      if (text === '/start') {
        return bot.sendMessage(id, `Hello ${msg.from.first_name}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`)
      }

      if(msg.from ) {
        fl = 1
      }
      console.log('@@@@@ here',msg.from, fl)
      if(fl) {
        return bot.sendMessage(id,`Thank your for the interest ${msg.from.first_name}, we'll contact you soon! <a href="t.me/maxim_tgn" >ddd</a>`)
        fl = 0
      }
    } catch(e){
        return bot.sendMessage(id,`Error send message`)
      }


  })
}

start()

