const axios = require('axios')

module.exports = {
    name: "loadDemoReports",
    description: "Loads demo reports onto the server's database.",
    async execute(message, args, origin) {
        await axios({
            method: 'get',
            url: `${origin}/${process.env.ADMIN_PASS}/loadDemoReports`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data != "<h1>Invalid admin password. Please try again.</h1>" && response.data == "Demo reports loaded!") {
                        message.reply(`Demo reports loaded! :white_check_mark:`)
                    } else {
                        message.reply("Failed to load demo reports. This is likely because of an incorrect admin password in the `.env` file of the bot. :negative_squared_cross_mark: :warning:")
                    }
                } else {
                    message.reply("Failed to connect to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                console.log("Error in loading demo reports: " + err)
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
            })
    }
}