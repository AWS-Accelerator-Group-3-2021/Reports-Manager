const axios = require('axios')

module.exports = {
    name: "clearReports",
    description: "Clears all reports from the system.",
    async execute(message, args) {
        await axios({
            method: 'get',
            url: `${process.env.ORIGIN_URL}/${process.env.ADMIN_PASS}/clearReports`,
            headers: {},
            data: {}
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data != "<h1>Invalid admin password. Please try again.</h1>" && response.data == "Reports cleared!") {
                        message.reply(`Reports cleared! :white_check_mark:`)
                    } else {
                        message.reply("Failed to clear reports. This is likely because of an incorrect admin password in the `.env` file of the bot. :negative_squared_cross_mark: :warning:")
                    }
                } else {
                    message.reply("Failed to connect to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                console.log("Error in clearing reports: " + err)
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
            })
    }
}