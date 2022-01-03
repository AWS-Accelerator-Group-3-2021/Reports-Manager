const Discord = require('discord.js')
const clearReports = require('./commands/clearReports')
const clearTokens = require('./commands/clearTokens')
const deleteReport = require('./commands/deleteReport')
const loadDefaultSettings = require('./commands/loadDefaultSettings')
const loadDemoReports = require('./commands/loadDemoReports')
const reloadDataFiles = require('./commands/reloadDataFiles')
const sendSampleReport = require('./commands/sendSampleReport')
const status = require('./commands/status')
const updateSettings = require('./commands/updateSettings')
const version = require('./commands/version')
const logger = require('./external/logger')
const bot = new Discord.Client()
require('dotenv').config()
// Import Logger class from logger.js

const PREFIX = 'r!'

var origin = process.env.ORIGIN_URL

bot.on('ready', () => {
    logger.log("Reports Manager bot is up and running!")
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
            clearReports.execute(message, args, origin)
            break
        case 'clearTokens':
            clearTokens.execute(message, args, origin)
            break
        case 'version':
            version.execute(message, args, origin)
            break
        case 'loadDemoReports':
            loadDemoReports.execute(message, args, origin)
            break
        case 'deleteReport':
            deleteReport.execute(message, args, origin)
            break
        case 'status':
            status.execute(message, args, origin)
            break
        case 'sendSampleReport':
            sendSampleReport.execute(message, args, origin)
            break
        case 'reloadDataFiles':
            reloadDataFiles.execute(message, args, origin)
            break
        case 'updateSettings':
            updateSettings.execute(message, args, origin)
            break
        case 'loadDefaultSettings':
            loadDefaultSettings.execute(message, args, origin)
            break
        case 'changeInternalURL':
            var newOriginURL = args.slice(1).join(' ')
            if (newOriginURL.length > 0) {
                origin = newOriginURL
                message.reply(`Changed internal target URL to ${origin} :white_check_mark:`)
            } else {
                message.reply(`Please provide a new internal target URL. :negative_squared_cross_mark: :warning:`)
            }
            break
        case 'currentInternalURL':
            message.reply(`The internal target URL is currently ${origin} :white_check_mark:`)
            break
        case 'list':
            message.reply('List of commands: \n\n' +
                '`clearReports` - Clears all reports.\n' +
                '`clearTokens` - Clears all tokens.\n' +
                '`version` - Gets the current version of the reports system.\n' +
                '`loadDemoReports` - Loads demo reports.\n' +
                '`deleteReport <REPORT ID>` - Deletes a report.\n' +
                '`status` - Checks if the reports system is online or not.\n' +
                '`sendSampleReport` - Sends a sample report.\n' +
                '`reloadDataFiles` - Reloads data files.\n' +
                '`updateSettings <LOGIN ALERTS ENABLED PARAMETER> <AUTH TOKEN EXPIRATION TIME PARAMETER>` - Updates server settings.\n' +
                '`loadDefaultSettings` - Loads default server settings.\n' +
                '`list` - Lists all commands.')
            break
    }
})

bot.login(process.env.DISCORD_BOT_TOKEN)