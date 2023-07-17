'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const { createApp } = Vue
import FilesAndFolders from '/f/6/lib/FilesAndFolders.js'

createApp(
    { template: `<FilesAndFolders />`, components: { FilesAndFolders }, }
).mount('#tFilesAndFolders')

const h1ParentList = [376598, 376778]
console.log(h1ParentList)
import { mcd } from '/f/6/lib/MetaContentData.js'
import { ws, readFilesAndFolders } from '/f/6/lib/wsDbRw.js'
import { dppItyComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

ws.onopen = event => readFilesAndFolders(
    { doc_id: h1ParentList, parent: h1ParentList }
    , json => {
        mcd.fafList = json.list
        console.log(mcd)
        dppItyComponent.faf.count++
    })
