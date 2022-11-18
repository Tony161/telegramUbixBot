# telegramUbixBot

Create bot and channel in telegram

## Create .env

Create .env file in root folder.

Env only for dev mode. Add this to .env file:

```
PORT=
TELEGRAM_TOKEN=
CHAT_ID=
HOST_URL= // only for production mode
NODE_ENV=developent // only for developent mode
POLLING_TIME= //set in ms for testing connection with bot
```

### Install

```
npm install
```

### Running on local network

1. `npm run dev`
2. Open http://localhost:3000/ in a browser on another computer or mobile device in the same network
