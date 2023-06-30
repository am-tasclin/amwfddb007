'use strict'
const { createApp } = Vue
const Okeys = Object.keys
import ddPersonal from './ddPersonal.js'
createApp({ data() { return { h1: ddPersonal.h1 } } }).mount('#h1')
console.log(ddPersonal, Okeys(ddPersonal.head))

const tGridTable1 = createApp({
    template: `
    a1
<table>
    <caption>Hi table!</caption>
</table>
`,
})
tGridTable1.mount('#tGridTable1')

import { testData } from './ddPersonal.js'
import { headKeysWithChild } from './lib/libGridTable.js'
const testGridTable2 = createApp({
    methods: {
        // tableData(){return ddPersonal},
        tableData(){return testData},
        headKeysWithChild() { return headKeysWithChild(this.tableData().head) }
    },
})
testGridTable2.mount('#testGridTable2')


console.log(headKeysWithChild(ddPersonal.head))
