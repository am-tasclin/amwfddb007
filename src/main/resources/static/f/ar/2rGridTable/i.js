'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
console.log(ddPersonal)

import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
createApp({
    components: { THead, TBody },
    template: `
<table>
    <caption>Hi table!</caption>
    <THead />
    <TBody />
</table>
`,
}).mount('#tGridTable1')
