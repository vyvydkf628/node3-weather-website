
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


//
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'DongCheol'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About   ',
        name: 'DongCheol'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'this is some helpful text',
        title: 'Help',
        name: 'DongCheol'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if (error){
                return res.send({error})
            }
        
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address:req.query.address
                })
            })
        }
        )
    }
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title: 404,
        errorType: 'Help article',
        name : 'DongCheol'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title: 404,
        errorType: 'Page',
        name :'DongCheol'
    })
})


 app.listen(3000, ()=>{
     console.log('Server is up on port 3000.')
 })