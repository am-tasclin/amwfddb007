'use strict'
const { createApp } = Vue
import { dbMpData} from '/f/3/lib/wsDbRw.js'
import { wsDbRw } from '/f/3/lib/wsDbRw.js'
import TFilesFolders from '/f/3/ff/TFF.js'

const tFilesFolders = createApp({ data() { return { count: 0 } }, })
tFilesFolders.component('t-ff', TFilesFolders)
tFilesFolders.mount('#tFF')

const sql = 'SELECT s.*, sort,parent FROM doc d \n\
LEFT JOIN (SELECT value value_22, string_id FROM string) s ON s.string_id = d.doc_id \n\
LEFT JOIN sort st ON st.sort_id = d.doc_id \n\
WHERE d.reference = 376600 \n\
ORDER BY sort'

const sendJson = {
    sql: sql, cmd: 'executeQuery'
}

console.log('→', sendJson)
wsDbRw.ws.onopen = event =>
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        dbMpData.list=json.list
    })
