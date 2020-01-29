

const sendLocation = (data,callback)=>{
    fetch('/weather?address='+data).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return callback(data.error,undefined)
            }else{
                callback(undefined,data)
            }
        })
    })    
}
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')//# : when i use id
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    //do not refresh
    e.preventDefault()
    messageOne.textContent= 'Loading....'
    messageTwo.textContent= ''

    const location = search.value
    sendLocation(location,(error,data)=>{
        if(error){
            messageOne.textContent=error
            messageTwo.textContent=''
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast

        }

    })
})
