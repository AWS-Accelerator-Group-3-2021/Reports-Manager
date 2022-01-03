const axios = require('axios')

module.exports = {
    name: "clearTokens",
    description: "Clears all tokens and hence auth sessions from the system.",
    async execute(message, args) {
        const origin = process.env.ORIGIN_URL

        await axios({
            method: 'get',
            url: `http://${origin}/${process.env.ADMIN_PASS}/clearTokens`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data != "<h1>Invalid admin password. Please try again.</h1>" && response.data == "Tokens cleared!") {
                        message.reply(`Tokens cleared! :white_check_mark:`)
                    } else {
                        message.reply("Failed to clear tokens. This is likely because of an incorrect admin password in the `.env` file of the bot. :negative_squared_cross_mark: :warning:")
                    }
                } else {
                    message.reply("Failed to connect to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                console.log("Error in clearing tokens: " + err)
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
            })
    }
}