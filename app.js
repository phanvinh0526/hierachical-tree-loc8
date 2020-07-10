const path = require('path')

const express = require('express')

const app = express()

const serverRoutes = require('./routes/server')

app.use(express.static(path.join(__dirname, 'public')))

app.use(serverRoutes)


// server listen port:5000
app.listen(5000)