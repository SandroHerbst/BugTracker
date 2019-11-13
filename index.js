const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

//config
const docId = '1c3pwSVjWcoIbXq2thIvvDSVms0HD5v-HseZ90WKf44A'
const worksheetIndex = 0

app.set('view engine','ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(request, response) => {
    response.render('home')
})

app.post('/',(request, response) => {

    const doc = new GoogleSpreadsheet(docId)

    doc.useServiceAccountAuth(credentials, (err) => {
        if(err) {
            console.log('não foi possível abrir a planilha')
        } else {
            console.log('planilha aberta')
            doc.getInfo((err, info) => {
                const worksheet = info.worksheets[worksheetIndex]
                worksheet.addRow({name: request.body.name, email: request.body.email}, err => {
                    response.send('bug reportado com sucesso')
                })
            })
        }
    })

})

app.get('/soma', (request, response) => {
    const a = parseInt(request.query.a)
    const b = parseInt(request.query.b)
    const soma = a + b
    response.send('<h1>A soma é: ' + soma + '</h1>') 
})

app.listen(3000, (err) => {
    if (err) {
        console.log('aconteceu um erro', err)
    } else {
        console.log('bugtracker rodando na porta 3000')
    }
})