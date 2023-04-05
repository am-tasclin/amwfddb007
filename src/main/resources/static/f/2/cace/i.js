'use strict'
import { cci, cace } from '/f/2/lib/cc/cci.js'
import CalcCell from '/f/2/lib/cc/CalcCell.js'
const { createApp } = Vue

// cace.d = {}//clcc data
cace.tc.square_size = [5, 4]//row:column

cci.l_ccId.push(1)
cci.ccId[1] = {}
cci.ccId[1].dMap = { 1: { v: 4 }, 2: { v: 5 }, 3: { sum: [1, 2] } }
cci.ccId[1].l_dMap = Object.keys(cci.ccId[1].dMap)

console.log(cace)

const tCaCe = createApp({
    data() { return { count: 0 } },
})
tCaCe.component('t-calc-cell', CalcCell)
tCaCe.mount('#tCaCe')
