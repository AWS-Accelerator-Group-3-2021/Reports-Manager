const axios = require('axios')

module.exports = {
    name: "sendSampleReport",
    description: "Adds a sample report into the system.",
    async execute(message, args) {
        function makeRandomString() {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        // Get current time in GMT and convert to string in the format of yyy-MM-dd'T'HH:mm:ss z
        var currentTime = new Date().toISOString()
        currentTime = currentTime.substring(0, currentTime.length - 5) + ' GMT'
        var uuid = makeRandomString()

        const origin = process.env.ORIGIN_URL
        
        await axios({
            method: 'post',
            url: `http://${origin}/newReport`,
            headers: {
                'Content-Type': 'application/json',
                'ReportsAccessCode': process.env.REPORTS_ACCESS_CODE
            },
            data: {
                "data": {
                    "id": uuid,
                    "reporter_name": "Sample Report",
                    "measurement": "1.8m",
                    "add_info": "This is a sample report that was sent to the reports system via a bot.",
                    "datetime": currentTime,
                    "address": "Some place on earth.",
                    "clientInfo": "Reports Manager Discord Bot"
                }
            }
        })
            .then(response => {
                if (response.status == 200) {
                    if (response.data == 'Report successfully added!') {
                        message.reply(`Sample report made successfully! If you want to, you can login to the system and view the report with this ID: \`${uuid}\`. :white_check_mark:`)
                    } else {
                        message.reply("There was an error in making a sample report. Please try again. :negative_squared_cross_mark: :warning:")
                        message.reply("Error message: " + response.data)
                    }
                } else {
                    message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                }
            })
            .catch(err => {
                message.reply("There was an error in connecting to The Reports System. Please run `r!status` to ensure that The Reports System is online. :negative_squared_cross_mark: :warning:")
                message.reply(`Error message: ${err}`)
                console.log("Error in making sample report: " + err)
            })
    }
}