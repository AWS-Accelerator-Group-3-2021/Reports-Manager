const axios = require('axios')

module.exports = {
    name: "version",
    description: "Gets the current version of the reports system.",
    async execute(message, args) {
        const origin = process.env.ORIGIN_URL
        
        await axios({
            method: 'get',
            url: `http://${origin}/ping`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data.startsWith("Pong!")) {
                        message.reply(`The Reports System is running Version \`${response.data.substring(15)}\`! :white_check_mark:`)
                    } else {
                        message.reply(`The Reports System seems to be offline! :negative_squared_cross_mark: :warning:`)
                    }
                } else {
                    message.reply(`Failed to get status from The Reports System! :negative_squared_cross_mark: :warning:`)
                }
            })
            .catch(err => {
                console.log("Error in fetching Reports System status: " + err)
                message.reply(`Failed to get status from The Reports System! :negative_squared_cross_mark: :warning:`)
                message.reply(`Error message: ${err}`)
            })
    }
}