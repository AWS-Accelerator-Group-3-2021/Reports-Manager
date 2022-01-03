const axios = require('axios')

module.exports = {
    name: "reloadDataFiles",
    description: "Re-reads the server's data files that store the reports.",
    async execute(message, args, origin) {
        await axios({
            method: 'get',
            url: `http://${origin}/${process.env.ADMIN_PASS}/reloadDataFiles`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data != "<h1>Invalid admin password. Please try again.</h1>" && response.data == "Data files reloaded!") {
                        message.reply(`Data files reloaded! :white_check_mark:`)
                    } else {
                        message.reply("Failed to re-load data files. This is likely because of an incorrect admin password in the `.env` file of the bot. :negative_squared_cross_mark: :warning:")
                    }
                } else {
                    message.reply("Failed to connect to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                console.log("Error in reloading data files: " + err)
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
            })
    }
}