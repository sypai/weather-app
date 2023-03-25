const request = require('postman-request')
const chalk =require('chalk')

const weather = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=ac2911ceb99240808f625902232103&q=' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
    
        if (error){
            callback(chalk.redBright('Unable to connect to the Weather API'), undefined)
        }
        else{
            try{
                const temp = body.current.temp_c
                const condition = body.current.condition.text
    
                callback(undefined, {condition, temp})
            }
            catch(e){
                console.log(chalk.yellow(e))
                callback(chalk.redBright('Unable to fetch data from Weather API'), undefined)
            }
        }
    })
}

module.exports = weather