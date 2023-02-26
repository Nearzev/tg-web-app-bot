const TelegramBot = require('node-telegram-bot-api');

require("dotenv").config();

const token = process.env.TOKEN
const webAppUrl = 'https://inspiring-sawine-42fe9f.netlify.app'
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const myId = 918830425;
    if(messageText === '/start') {
      await bot.sendMessage(chatId, 'Ниже появится кнопка заполнения формы ',{
        reply_markup: {
          inline_keyboard: [
            [{text:'Сайт', web_app: {url: webAppUrl}}]
          ]
        }
      })

      await bot.sendMessage(chatId, 'Ниже появится кнопка заполнения формы',{
        reply_markup: {
          keyboard: [
            [{text:'Регистрация', web_app: {url: webAppUrl}}],
            [{text:'Список участников', web_app: {url: webAppUrl}}],
            [{text:'Моя команда', web_app: {url: webAppUrl}}]
          ]
        }
      })
    }

    if(messageText === '/start' && chatId === myId) {
      await bot.sendMessage(chatId, 'Ниже появится кнопка заполнения формы',{
        reply_markup: {
          keyboard: [
            [{text:'Регистрация', web_app: {url: webAppUrl}}],
            [{text:'Список участников', web_app: {url: webAppUrl}}],
            [{text:'Моя команда', web_app: {url: webAppUrl}}],
            [{text:'Назначить матч', web_app: {url: webAppUrl}}]          ]
        }
      })
    }

  
    if(msg?.web_app_data?.data) {
      try {
        const data = JSON.parse(msg?.web_app_data?.data)
        await bot.sendMessage(myId, 'TG: ' + chatId + ' ' + 'Ник: ' + data?.nickname + ' ' + 'Ранг: ' + data?.elo + ' ' + 'Дивизион: ' + data?.division);
        await bot.sendMessage(chatId, data?.nickname + ' ' + 'спасибо за регистрацию');
        await bot.sendMessage(chatId, 'Всю информацию в сможете получить в этом чате')
      } catch (e) {
        console.log(e);
      }
    }
});
