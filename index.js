const express = require('express')
const app = express()
const path = require('path')

app.set('view engine','ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.get('/',(request, response) => {
    response.render('home')
})

app.post('/',(request, response) => {
    response.send('postou')
})

app.get('/soma', (request, response) => {
    const a = parseInt(request.query.a)
    const b = parseInt(request.query.b)
    const soma = a + b
    response.send('<h1>A soma é: ' + soma + '</h1>') 
})

app.listen(3000)