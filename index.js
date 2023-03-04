const TelegramBot = require('node-telegram-bot-api');

require("dotenv").config();


const token = process.env.TOKEN
const webAppUrl = 'https://inspiring-sawine-42fe9f.netlify.app'
const bot = new TelegramBot(token, {polling: true});
const usersList = [];
const DataBaseUrl = 'https://63fdd8c4cd13ced3d7c02d2a.mockapi.io/t/Users';



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


  if(messageText === '/players') {

    const mapUsers = (users) => {
      usersList.push(users.map(({_id, ...rest}) => ({id: _id, ...rest}))) 
      showUserList()
    };

    const getUsersList = () => {
      fetch(DataBaseUrl)
      .then(response => response.json())
      .then(mapUsers);
    }
      
  const showUserList = ()  =>  {
    usersList.forEach(async users => {
          users.forEach((user, id) => {
          bot.sendMessage(chatId, `Игрок:`)
          for(let key in user) {
          if (user.hasOwnProperty(key)) {
            bot.sendMessage(chatId, 'Игрок:'+  key + " : " + user[key])
          }
        }
      })
    })
  }

  getUsersList()

}

    if(msg?.web_app_data?.data) {
      try {
        const data = JSON.parse(msg?.web_app_data?.data);
        const createUser = (userData) => {
          fetch(DataBaseUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(userData)
          })
        } 
        createUser(data)


        await bot.sendMessage(myId, 'TG: ' + chatId + ' ' + 'Ник: ' + data?.nickname + ' ' + 'Ранг: ' + data?.elo + ' ' + 'Дивизион: ' + data?.division);
        await bot.sendMessage(chatId, data?.nickname + ' ' + 'спасибо за регистрацию');
        await bot.sendMessage(chatId, 'Всю информацию в сможете получить в этом чате')
      } catch (e) {
        console.log(e);
      }
    }
});






const updateUser = (userId, userData) => {
  fetch(`${DataBaseUrl}/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userData)
  })
}

const deleteUser = (userId) => {
              fetch(`${DataBaseUrl}/${userId}`, {
                  method:'DELETE',
              })
}