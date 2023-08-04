'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { confTree, initDomConfLogic, uniqueIdPageRead } from
    '/f/7/libDomGrid/libDomGrid.js'
initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = uniqueIdPageRead()

import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds } from '/f/7/libDbRw/libMcRDb.js'
ws.onopen = event =>
    readAdnByIds(uniqueIdsForDbRead)

const { createApp } = Vue
import McElement from '/f/7/libDomGrid/McElement.js'
const app_treeDom = createApp({
    components: { McElement },
    methods: {
        confTree() { return confTree() },
        u_l() { return uniqueIdsForDbRead },
    }, template: `
<div v-for="adnId in confTree()[0].rootList">
    <McElement :adnId="adnId" :treeRootId="adnId" path="tree,0"/>
</div>
`,
})
app_treeDom.component('t-mc-element', McElement)
app_treeDom.mount('#treeDom')

createApp({
    methods: {
        click() {
            console.log(123)
        }
    }
}).mount('#devTest')