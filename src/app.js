const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        "title":"Weather App"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        "title":"Help Page"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address term"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast:forcastData,
                address:req.query.address
            })
          })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide a search term"
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        "title":"Help page not found"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        "title":"My 404 page"
    })
})

app.listen(port,()=>{
    console.log("Server is running on the port " + port)
})