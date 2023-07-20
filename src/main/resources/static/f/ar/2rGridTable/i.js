'use strict'
const { createApp } = Vue
import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'

const page = {}// This page object

ws.onopen = event => executeSelectQuery(
    'SELECT * FROM kassa.entry'
).then(json => {
    console.log(json, page)
    page.list = json.list
    page.tDbTable02.count++
})

createApp({
    data() { return { count: 0 } },
    mounted() {
        page.tDbTable02 = this
    }, methods: {
        colList() { return page.list && Object.keys(page.list[0] || []) },
        list() { return page.list }
    }
}).mount('#tDbTable02')

import ddPersonal from './ddPersonal.js'
console.log(ddPersonal)
import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
import { getBodyColumns, getHeadKeyObject } from './libGridTable/libGridTable.js'
console.log('id', getHeadKeyObject('id'))
console.log('firstName', getHeadKeyObject('firstName'))

createApp({
    components: { THead, TBody },
    methods: {
        keys() { return getBodyColumns() },
        columnConf(cName) { return getHeadKeyObject(cName) },
    }, template: `
<div style="max-height:22em; overflow: auto;">
    <table class="am-hf-sticky01" >
        <caption>Hi table!</caption>
        <THead />
        <TBody />
        <tfoot class="w3-white ">
            <tr>
                <th class="w3-border-top w3-border-bottom">id</th>
                <th class="w3-border-left w3-border-top w3-border-bottom">a2</th>
            </tr>
        </tfoot>
    </table>
</div>&nbsp;
{{keys()}}
<div class="w3-border-top">
    id = {{columnConf('id')}}
</div>
<div class="w3-border-top">
firstName = {{columnConf('firstName')}}
</div>
`,
}).mount('#tGridTable1')

