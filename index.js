const express = require('express')
const app = express()

app.get('/',(request, response) => {
    response.send(request.query)
})

app.listen(3000)