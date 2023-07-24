'use strict'
const { createApp } = Vue
import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'
import { makeGridTable } from './libGridTable/libGridTable.js'

const gridKassaEntry = makeGridTable('kassaEntry')
gridKassaEntry.initMakeSelect('kassa.entry')

const selectKassaEntry = gridKassaEntry.makeSelect().get()
console.log(selectKassaEntry)
console.log(gridKassaEntry.makeSelect().initColumns(' count(*) AS cnt ').get())

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
        <caption>Hi table! 4:t⇐dd</caption>
        <TBody gridTableName="kassaEntry" />
    </table>&nbsp;
</div>&nbsp;
`,
}).mount('#tGridTable1')


//table config container -- self education
const tCC = tableName => {
    return {
        tableName: tableName,
        f1() { return 'Hi ' + this.tableName }
    }
}

const centralTable = tCC('centralTable')
const ddTable = tCC('ddTable')
// console.log(centralTable.tableName)
// console.log(centralTable.f1())
// console.log(ddTable.f1())

const makeAdder = x => y => x + y
// console.log(makeAdder(1)(2))

const add3 = makeAdder(3)
const add11 = makeAdder(11)
// console.log(add3(2)) // 5
// console.log(add11(2)) // 13
