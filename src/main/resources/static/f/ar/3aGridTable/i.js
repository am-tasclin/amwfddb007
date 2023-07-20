
'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
import TFoot from './libGridTable/TFoot.js'
import {getHeadKeyObject } from './libGridTable/libGridTable.js'



// console.log('dnom', getHeadKeyObject('dnom'))
// console.log('dateprov', getHeadKeyObject('dateprov'))
// console.log('sumaprov', getHeadKeyObject('sumaprov'))
// console.log('nameval', getHeadKeyObject('nameval'))
// console.log('sumaprov', getHeadKeyObject('sumaprov'))
// console.log('snal', getHeadKeyObject('snal'))
// console.log('namekassop', getHeadKeyObject('namekassop'))
// console.log('namecontr', getHeadKeyObject('namecontr'))
// console.log('iddoc', getHeadKeyObject('iddoc'))
// console.log('nameoperator', getHeadKeyObject('nameoperator'))





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