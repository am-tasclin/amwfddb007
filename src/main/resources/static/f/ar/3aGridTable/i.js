
'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
import TFoot from './libGridTable/TFoot.js'
import {getHeadKeyObject } from './libGridTable/libGridTable.js'

console.log(' fffff ', 44)

console.log('id', getHeadKeyObject('id'))

console.log('firstName', getHeadKeyObject('firstName'))


createApp({
    components: { THead, TBody, TFoot },

    template: `
    <caption>Довідник!</caption>


 <div style="max-height:33em; overflow: auto;">
    <table class="am-hf-sticky01" >
       <THead />
       <TBody />  
       <TFoot />
    </table>
 </div>
   
`,
}).mount('#tGridTable1')