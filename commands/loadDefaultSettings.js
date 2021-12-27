const axios = require('axios')

module.exports = {
    name: "loadDefaultSettings",
    description: "Loads the default settings for the server.",
    async execute(message, args) {
        const origin = process.env.ORIGIN_URL
        await axios({
            method: 'get',
            url: `https://${origin}/${process.env.ADMIN_PASS}/loadDefaultSettings`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data != "<h1>Invalid admin password. Please try again.</h1>" && response.data == "Settings loaded successfully!") {
                        message.reply(`Default settings loaded successfully! :white_check_mark:`)
                    } else {
                        message.reply("Failed to load default settings. This is likely because of an incorrect admin password in the `.env` file of the bot. :negative_squared_cross_mark: :warning:")
                    }
                } else {
                    message.reply("Failed to connect to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                console.log("Error in loading default settings: " + err)
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
            })
    }
}