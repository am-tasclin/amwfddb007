'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
console.log(ddPersonal)

import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
createApp({
    components: { THead, TBody },
    template: `
    a1
<div style="max-height:33em; overflow: auto;">
    <table class="am-hf-sticky01">
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
`,
}).mount('#tGridTable1')
/* <table s1tyle="table-layout: fixed;"> 
*/
