
const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const msg1 = document.querySelector('#messageOne')
const msg2 = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const location = search.value
   msg1.textContent = 'Loading....'
   msg2.textContent = '';           //clears the 1st written elements
   fetch('/weather?address=' + location).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            msg1.textContent = data.error
         } else {
            // console.log(data.location)
            // console.log(data.forecast)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
         }
      })
   })
})