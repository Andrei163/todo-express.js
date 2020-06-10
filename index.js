const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mainRoutes = require('./routes/main')
const helpers = require('handlebars-helpers')



const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: helpers
})


app.engine('hbs', hbs.engine)



app.set('view engine', 'hbs')



app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/', mainRoutes)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})