const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { promisify } = require('util')

const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

const sgMail = require('@sendgrid/mail')


//config
const docId = 'aqui_vai_o_id_do_doc'
const worksheetIndex = 0
const sendGridKey = 'aqui_vai_a_chave_do_send_grid'

app.set('view engine','ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(request, response) => {
    response.render('home')
})

app.post("/", async (request, response) => {
  try {
    const doc = new GoogleSpreadsheet(docId);
    await promisify(doc.useServiceAccountAuth)(credentials);
    console.log("planilha aberta");
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[worksheetIndex];
    await promisify(worksheet.addRow)({
      name: request.body.name,
      email: request.body.email,
      issueType: request.body.issueType,
      howToReproduce: request.body.howToReproduce,
      expectedOutput: request.body.expectedOutput,
      receivedOutput: request.body.receivedOutput,
      userAgent: request.body.userAgent,
      userDate: request.body.userDate,
      source: request.query.source || 'direct'
    })

    // se for critico
    if (request.body.issueType === 'CRITICAL') {
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        sgMail.setApiKey(sendGridKey)
        const msg = {
            to: 'sandro.herbst@gmail.com',
            from: 'sandro.herbst@gmail.com',
            subject: 'BUG Critico reportado',
            text: `
                O usuário ${request.body.name} reportou um problema.
            `,
            html: `O usuário ${request.body.name} reportou um problema.`,
        }
        await sgMail.send(msg)
    }

    response.render('sucesso')

  } catch (err) {
    response.send('Erro ao enviar o formulário.')
    console.log(err)    
  }
});

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
        console.log('bugtracker rodando em http://localhost:3000')
    }
})