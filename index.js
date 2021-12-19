const Discord = require('discord.js')
const clearReports = require('./commands/clearReports')
const clearTokens = require('./commands/clearTokens')
const deleteReport = require('./commands/deleteReport')
const loadDemoReports = require('./commands/loadDemoReports')
const sendSampleReport = require('./commands/sendSampleReport')
const status = require('./commands/status')
const version = require('./commands/version')
const bot = new Discord.Client()
require('dotenv').config()

const PREFIX = 'r!'

bot.on('ready', () => {
    console.log("Reports manager is up and running!")
})

bot.on('message', message => {
    if (!message.content.startsWith(PREFIX)) return
    if (message.guild.id != '909686440525459536' && message.guild.id != '805723501544603658') {
        return
    }
    try {
        var hasRole = message.guild.member(message.author).roles.cache.find(role => role.id === '805724725623259147' || role.id === '916572254534508554')
        if (!hasRole) {
            console.log(`User ${message.author.username} is unauthorised to use this bot.`)
            message.reply('You are not authorised to use this bot.')
            return
        } else {
            console.log(`User ${message.author.username} has been authorised.`)
        }
    } catch (err) {
        console.log("Error in authorising user: " + err)
        return
    }
    

    var args = message.content.substring(PREFIX.length).split(" ")
    switch (args[0]) {
        case 'clearReports':
            clearReports.execute(message, args)
            break
        case 'clearTokens':
            clearTokens.execute(message, args)
            break
        case 'version':
            version.execute(message, args)
            break
        case 'loadDemoReports':
            loadDemoReports.execute(message, args)
            break
        case 'deleteReport':
            deleteReport.execute(message, args)
            break
        case 'status':
            status.execute(message, args)
            break
        case 'sendSampleReport':
            sendSampleReport.execute(message, args)
            break
    }
})

bot.login(process.env.DISCORD_BOT_TOKEN)