const chalk = require('chalk')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const address = process.argv[2]

if (address){
    geocode(address, (error, { latitude, longitude, name } = {}) => {
        
        if (error){
            return console.log(error)
        }
        
        weather({latitude, longitude}, (error, {condition, temp}) => {
            
            if (error){
                return console.log(error)
            }
    
            console.log(chalk.cyan(name))
            console.log(chalk.cyan('It is ' + chalk.green(condition) + ' outside and the temperature is ' + chalk.green(temp + '°C')))
        
        })

    }) 
}
else{
    console.log(chalk.redBright('Kindly provide a valid location as an argument'))
}


