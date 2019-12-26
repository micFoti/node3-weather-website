// console.log("js file is loaded")

// fetch("http://puzzle.mead.io/puzzle").then(response=>{
// response.json().then(data=>{console.log(data)})
// })

const weatherForm = document.querySelector('form')
const serach = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener("submit", function(e){
  e.preventDefault()

const location = serach.value;
message1.textContent = "loading..."
message2.textContent =  ""
fetch("Weather?address="+location).then(response=>{
  response.json().then(data=>{
   
    if (data.error){
      message1.textContent = data.error
     } else if (data.message){
    message1.textContent = data.message
    }else{
    message1.textContent = data.location
    message2.textContent = data.forecast


   }
 })
 })
 })

 


