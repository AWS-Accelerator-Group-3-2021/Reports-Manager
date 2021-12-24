const axios = require('axios')

module.exports = {
    name: "status",
    description: "Checks if the report system is online or not.",
    async execute(message, args) {
        const origin = process.env.ORIGIN_URL

        await axios({
            method: 'get',
            url: `https://${origin}/ping`,
            headers: {},
            data: {}
        })
        .then(response => {
            if (response.status == 200) {
                if (response.data.startsWith("Pong!")) {
                    message.reply(`Bot is active and The Reports System is online and running Version \`${response.data.substring(15)}\`! :white_check_mark:`)
                } else {
                    message.reply(`Bot is active but The Reports System seems to be offline! :negative_squared_cross_mark: :warning:`)
                }
            } else {
                message.reply(`Bot is active but failed to get status from The Reports System! :negative_squared_cross_mark: :warning:`)
            }
        })
        .catch(err => {
            console.log("Error in fetching Reports System status: " + err)
            message.reply(`Bot is active but failed to get status from The Reports System! :negative_squared_cross_mark: :warning:`)
            message.reply(`Error message: ${err}`)
        })
    }
}