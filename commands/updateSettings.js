const axios = require('axios')

module.exports = {
    name: "updateSettings",
    description: "Updates the server settings.",
    async execute(message, args, origin) {
        if (!args[1]) {
            message.reply("Please specify either `true` or `false` for the `loginAlertsEnabled` setting! :negative_squared_cross_mark:")
            return
        }
        if (!args[2]) {
            message.reply("Please specify the duration in seconds for the `authTokenExpirationTime` setting! :negative_squared_cross_mark:")
            return
        }

        try {
            const timeAsInt = parseInt(args[2])
            if (isNaN(timeAsInt)) {
                message.reply("Please specify a valid number for the `authTokenExpirationTime` setting! :negative_squared_cross_mark:")
                return
            }
        } catch (err) {
            message.reply("Please specify a valid number for the `authTokenExpirationTime` setting! :negative_squared_cross_mark:")
            console.log("Error in parsing authTokenExpirationTime as integer: " + err)
            return
        }
        const admin_pass = process.env.ADMIN_PASS

        await axios({
            method: 'post',
            url: `${origin}/${admin_pass}/updateSettings`,
            headers: {},
            data: {
                "data": {
                    "settings": {
                        "loginAlertsEnabled": args[1],
                        "authTokenExpirationTime": args[2]
                    }
                }
            }
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data == 'Settings updated successfully!') {
                        message.reply(`Server settings successfully updated! :white_check_mark:`)
                    } else {
                        message.reply("There was an error in updating the server settings. Please try again. :negative_squared_cross_mark: :warning:")
                        message.reply("Error message: " + response.data)
                    }
                } else {
                    message.reply("Failed to update the server settings. Please try again! :negative_squared_cross_mark: :warning:")
                    message.reply("Error message: " + response.data)
                    return
                }
            })
            .catch(err => {
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
                console.log("Error in updating server settings: " + err)
            })
    }
}