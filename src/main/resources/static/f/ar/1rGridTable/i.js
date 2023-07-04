'use strict'
const { createApp } = Vue
import ddPersonal from './ddPersonal.js'
const Okeys = Object.keys

createApp({ data() { return { h1: ddPersonal.h1 } } }).mount('#h1')
console.log(ddPersonal, Okeys(ddPersonal.head))

import THead from './lib/THead.js'
const tGridTable1 = createApp({
    components: { THead },
    template: `
<table>
    <caption>Hi table!</caption>
    <THead />
</table>
`,
})

tGridTable1.mount('#tGridTable1')

import { testData } from './ddPersonal.js'
import { headKeysWithChild } from './lib/libGridTable.js'
const testGridTable2 = createApp({
    methods: {
        // tableData() { return ddPersonal },
        tableData() { return testData },
        headKeysWithChild() { return headKeysWithChild(this.tableData().head) },
        headSortClick(k) {
            console.log(k, this.tableData().head[k])
        }, headSortClick2(k1, k) {
            console.log(k1, this.tableData().head[k1])
            console.log(k1, k, this.tableData().head[k1].child[k])
        },
        childCount(o) { return !o && 1 || Okeys(o).length }
    },
})
testGridTable2.mount('#testGridTable2')


console.log(headKeysWithChild(ddPersonal.head))

