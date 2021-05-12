const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

//printing current directory name and set public directory using path
console.log(__dirname)
const publicDirectory = path.join(__dirname, '../public')

//Express call for app
const app = express()

// Setting up hbs for express and providing the custom path. By default it looks for views folder inside root folder
const viewsDirectoryPath = path.join(__dirname, '../template/views')
const partialsDirectoryPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectory))

//creating default route for home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adhir'
    })
})


//creating help route pointing to help.hbs and passing the values at runtime
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'helpdesk@gmail.com'
    })
})

//creating about route pointing to about.hbs and passing the values at runtime
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Entain'
    })
})

//creating weather route by passing static json value
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address parameter'
        })
    }

    geocode.getGeoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast.forcast(latitude, longitude, (error, forcarstData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forcast: forcarstData, location,
                address: req.query.address
            })
           
        })

    })
})


app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Adhir',
        erroMessage: 'Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})