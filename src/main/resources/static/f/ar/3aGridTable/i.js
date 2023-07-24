'use strict'

import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'
import { setBody, getGridComponent, getZapros } from './libGridTable/libGridTable.js'

const sql = 
' SELECT '+
getZapros().sqlSelect +
getZapros().sqlFrom+
getZapros().sqlWhere1
console.log(' SQL ', sql)

ws.onopen = event => executeSelectQuery(
    sql 
   ).
   then(json => {

      setBody(json.list)
      getGridComponent().tBody.count++



   })


const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
import TFoot from './libGridTable/TFoot.js'
import { getHeadKeyObject } from './libGridTable/libGridTable.js'



createApp({
   components: { THead, TBody, TFoot },

   template:
      `
 <div style="max-height:33em; overflow: auto;">
    <table class="am-hf-sticky01" >
       <THead />
       <TBody />  
       <TFoot />
    </table>
 </div>
   
`,
}).mount('#tGridTable1')