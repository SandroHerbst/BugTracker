const express = require('express')
const app = express()

app.get('/',(request, response) => {
    response.send(request.query)
})

app.get('/soma', (request, response) => {
    const a = parseInt(request.query.a)
    const b = parseInt(request.query.b)
    const soma = a + b
    response.send('<h1>A soma é: ' + soma + '</h1>') 
})

app.listen(3000)