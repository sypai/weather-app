const request = require('postman-request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=1e24cf308bf6669029d71b210c221739&query=' + address 

    request({url, json: true}, (error, { body }) => {
        
        if (error){
            callback(chalk.redBright('Unable to connect to the Geocode API'), undefined)
        }
        else{
            try{
                const latitude = body.data[0].latitude
                const longitude = body.data[0].longitude
                const name = body.data[0].name
                
                callback(undefined, {latitude, longitude, name})

            }
            catch(e){
                console.log(chalk.yellow(e))
                callback(chalk.redBright('Unable to fetch data from Geocode API'), undefined)
            }
        }
    })
}

module.exports = geocode