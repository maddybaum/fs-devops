const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '78c7d53ac5774de9b2b788144ef74967',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



const restaurants = ['Taco Bell', 'Ramen Nagi', 'McDonalds']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/restaurants', (req, res) => {
    res.status(200).send(restaurants)
})

app.post('/api/restaurants', (req, res) => {
   let {name} = req.body

   const index = restaurants.findIndex(restaurant => {
       return restaurant === name
   })

   try {
       if (index === -1 && name !== '') {
        restaurants.push(name)
           res.status(200).send(restaurant)
       } else if (name === ''){
           res.status(400).send('You must enter a name.')
       } else {
           res.status(400).send('That restaurant already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/restaurnts/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    restaurants.splice(targetIndex, 1)
    res.status(200).send(restaurants)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))
