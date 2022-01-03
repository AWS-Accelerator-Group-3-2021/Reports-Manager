const axios = require('axios')

module.exports = {
    name: "deleteReport",
    description: "Deletes a report from the reports system.",
    async execute(message, args) {
        if (!args[1]) {
            message.reply("Please specify a report ID to delete.")
            return
        }

        const origin = process.env.ORIGIN_URL

        await axios({
            method: 'post',
            url: `http://${origin}/deleteReport`,
            headers: {
                'Content-Type': 'application/json',
                'ReportsAccessCode': process.env.REPORTS_ACCESS_CODE
            },
            data: {
                "data": {
                    "id": args[1]
                }
            }
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data == 'Report successfully deleted!') {
                        message.reply(`Report \`${args[1]}\` successfully deleted! :white_check_mark:`)
                    } else {
                        message.reply("There was an error in deleting the report with the given ID. Please try again. :negative_squared_cross_mark: :warning:")
                        message.reply("Error message: " + response.data)
                    }
                } else {
                    message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
                console.log("Error in deleting report: " + err)
            })
    }
}