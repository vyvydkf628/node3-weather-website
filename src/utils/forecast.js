const request = require('request')
const forecast= (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/a1ee992c7aaea81a4d4f6bc81f52dc23/'+latitude+','+longitude+'?lang=ko'
    request({ url,json:true},(error,{ body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' +body.currently.temperature+ ' degrees out. There is a '+body.currently.precipProbability+ '% chance of rain')
        }
    })

}
module.exports =forecast