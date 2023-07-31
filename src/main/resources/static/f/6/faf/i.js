'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const { createApp } = Vue
import FilesAndFolders from '/f/6/lib/FilesAndFolders.js'

const h1ParentList = [376598, 376778] // folder IDs
console.log(h1ParentList)
createApp({ template: `<FilesAndFolders />`, components: { FilesAndFolders }, }
).mount('#tFilesAndFolders')

import DbMessagePool from '/f/6/lib/DbMessagePool.js'
createApp({ template: `<DbMessagePool/>`, components: { DbMessagePool }, }
).mount('#dbMessagePool')

createApp({
    methods: {
        clickTest() { console.log(123) }, // @click=
        rightClickTest() { console.log(123) }, // @contextmenu=
    }
}).mount('#forContextMenu')
/**
basic example
https://codepen.io/SimpleSoftwareIO/pen/yNwYJb

to education
https://codesandbox.io/embed/p99q98n6xm
https://medium.com/@akumaisaacakuma/how-to-create-custom-context-menu-in-vue-970e67059532

 */


import { mcd } from '/f/6/lib/MetaContentData.js'
import { ws, readFilesAndFolders } from '/f/6/lib/wsDbRw.js'
import { dppItyComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

ws.onopen = event => readFilesAndFolders(
    { doc_id: h1ParentList, parent: h1ParentList }
    , json => {
        mcd.fafList = json.list
        mcd.folderIdList = h1ParentList
        console.log(mcd)
        dppItyComponent.faf.count++
    })
