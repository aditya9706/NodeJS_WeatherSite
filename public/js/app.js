console.log('client side javascript file')

const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')
const msgThree = document.querySelector('#msgThree')

// msgOne.textContent = 'From JS'


weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
   
    msgOne.textContent = 'Loading ...'
    msgTwo.textContent = ''
    msgThree.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error
        }
        else{
            msgOne.textContent = "Current temperature is : " + data.temperature + "C."
            msgTwo.textContent = "Wind direction is " + data.wind_dir + " and wind speed is " + data.wind_spd + "."
            msgThree.textContent = "Sky description is " + data.description + "." 
        }
    })
    })
    console.log(location)
})