console.log('Client side javascript file has been loaded')

const weatherForm = document.querySelector('.search')
const search = document.querySelector('input')

const tempNumber = document.querySelector('#temp-num')
const tempUnit = document.querySelector('#temp-unit')
const conditionS = document.querySelector('#condition')

const second = document.querySelector('.second')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    tempNumber.textContent = ''
    tempUnit.textContent = ''
    conditionS.textContent = ''
    second.textContent = "Looking what it's like in " + location +"..."

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                console.log(data.error)
                second.textContent = data.error
            }
            else{
                console.log(data)
                tempNumber.textContent = data.temp
                tempUnit.textContent = '°C, '
                conditionS.textContent = data.condition
                second.textContent = data.name
            }
        })
    })

})