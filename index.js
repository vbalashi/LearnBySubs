const TelegramApi = require('node-telegram-bot-api')
const token = '1917307536:AAEhCsfHSVjl2FLKXtTmMEG_UwmVaUhCUkk'

const bot = new TelegramApi(token, {polling: true})

const chats = {}
const path = '/Users/Nikolay_Khrustalev/SynologyDrive/Witcher/S01.E06'

const controlButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Previous', callback_data: 'previous'}, {text: 'Next', callback_data: 'next'}],
        ]
        })
}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}],
            [{text: '2', callback_data: '2'}],
            [{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}]
        ]
    })
}


const start = () => {
    bot.setMyCommands([
        {command: '/info', description: `provide user info`},
        {command: '/start', description: 'start message'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
//        console.log(msg);
        
        if (text === '/start') {
            return bot.sendMessage(chatId, `this the first message`, controlButtons)
        }

        if (text === '/info') {
            return bot.sendMessage(chatId, `your message is ${text}, your name is ${msg.from.first_name} ${msg.from.last_name}`);
        }
        return bot.sendMessage(chatId, `I don't understand`, controlButtons)
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg)
        await bot.sendMessage(chatId, `your choice is ${data}`)
    })
}

start()