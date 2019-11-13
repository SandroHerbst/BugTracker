const express = require('express')
const app = express()

app.get('/',(request, response) => {
    response.send('Olá Fullstack Lab!')
})

app.listen(3000)