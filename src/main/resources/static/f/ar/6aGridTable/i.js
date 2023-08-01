'use strict'
const { createApp } = Vue
import { makerGridTable } from './libGridTable/libGridTable.js'

const gridKassaDoc = makerGridTable('kassaDoc')
const kassaDoc01SelectMaker = gridKassaDoc.initSelectMaker('ksdoc', 'kassa.entry1')
const selectKassaDoc = kassaDoc01SelectMaker.get()

const gridKassaDocMat = makerGridTable('kassaDocMat')
const kassaDocMat01SelectMaker = gridKassaDocMat.initSelectMaker('ksdocmat', 'kassa.entry1mat')
console.log(kassaDocMat01SelectMaker.setFrom(' (select * from entry1mat e, ddmaterial d where e.id_mat=d.id_mat ) entryem'))
console.log(kassaDocMat01SelectMaker.getFrom)

const selectKassaDocMat = kassaDocMat01SelectMaker.get()



console.log('selectKassaDoc  ', selectKassaDoc)
console.log(kassaDoc01SelectMaker.initColumns(' * ').get())

console.log('selectKassaDocMAt  ', selectKassaDocMat)
console.log(kassaDocMat01SelectMaker.initColumns(' * ').get())




import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'
ws.onopen = event =>
    executeSelectQuery(selectKassaDoc).
        then(json => {
            console.log('лінія 17 і так написано', json.list)
            console.log('  ssss  ', gridKassaDoc.setTableBody(json.list))

            gridKassaDoc.setTableBody(json.list)
            gridKassaDoc.get().tBody.count++

            executeSelectQuery(selectKassaDocMat).
                then(json => {
                    console.log('ddddd ', json.list)
                    
                    gridKassaDocMat.setTableBody(json.list)
                    gridKassaDocMat.get().tBody.count++
        
                })


        })




import TBody from './libGridTable/TBody.js'
createApp({
    components: { TBody },
    template: `
<div style="max-height:22em; overflow: auto;">
    <table class="am-hf-sticky01">
        <caption>Hi table! 5:t⇐dd</caption>
        <TBody gridTableName="kassaDoc" />
    </table>&nbsp;
</div>

<div style="max-height:22em; overflow: auto;">
    <table class="am-hf-sticky01">
        <caption>----------------------------------5</caption>
        <TBody gridTableName="kassaDocMat" />
        ----------------------------------
    </table>&nbsp;
</div>

&nbsp;
`,
}).mount('#tGridTable1')
