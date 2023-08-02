'use strict'
const { createApp } = Vue
import { makerGridTable } from './libGridTable/libGridTable.js'

const gridKassaEntry = makerGridTable('kassaEntry')
    , kassaEntry01SelectMaker = gridKassaEntry.initSelectMaker('ksEy01', 'kassa.entry')
const selectKassaEntry = kassaEntry01SelectMaker.get()
console.log(selectKassaEntry)
console.log(kassaEntry01SelectMaker.initColumns(' count(*) AS cnt ').get())

import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'
ws.onopen = event =>
    executeSelectQuery(selectKassaEntry
    ).then(json => {
        console.log('лінія 17 і так написано', json)
        gridKassaEntry.setTableBody(json.list)
        gridKassaEntry.get().tBody.count++
    })

import TBody from './libGridTable/TBody.js'
createApp({
    components: { TBody },
    template: `
<div style="max-height:22em; overflow: auto;">
    <table class="am-hf-sticky01">
        <caption>Hi table! 5:t⇐dd</caption>
        <TBody gridTableName="kassaEntry" />
    </table>&nbsp;
</div>&nbsp;
`,
}).mount('#tGridTable1')
