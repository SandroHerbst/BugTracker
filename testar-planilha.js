const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

const doc = new GoogleSpreadsheet('1c3pwSVjWcoIbXq2thIvvDSVms0HD5v-HseZ90WKf44A')

doc.useServiceAccountAuth(credentials, (err) => {
    if(err) {
        console.log('não foi possível abrir a planilha')
    } else {
        console.log('planilha aberta')
        doc.getInfo((err, info) => {
            console.log(info)
            const worksheet = info.worksheets[0]
            worksheet.addRow({name: 'Sandro', email: 'teste'}, err => {
                console.log('linha inserida')
            })
        })
    }
})