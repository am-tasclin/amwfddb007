'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { initDomConfLogic, setDomComponent, getDomComponent } from
    '/f/7/libDomGrid/libDomGrid.js'
const domConf = initDomConfLogic(window.location.hash.substring(1))

// console.log(domConf)
const uniqueIdsForDbRead = domConf.hew.l.concat(domConf.actuallyTreeObj.rootList)
console.log(uniqueIdsForDbRead)

import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds, readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'
import { confHew } from '/f/7/libDomGrid/libDomGrid.js'

ws.onopen = event =>
    uniqueIdsForDbRead.length && readAdnByIds(uniqueIdsForDbRead
    ).then(() => readAdnByParentIds(uniqueIdsForDbRead
    ).then(() => {
        console.log(domConf)
        console.log(confHew())
    }
    ).then(() => uniqueIdsForDbRead.forEach(hewId => confHew().hewComponent[hewId].count++)))

import { reViewActivePanel } from '/f/7/libDomGrid/libDomGrid.js'
import Hew from '/f/7/libHew/Hew.js'
const { createApp } = Vue
const pageConf = createApp({
    methods: {
        clickTree(treeId) { reViewActivePanel(treeId, 'Tree') },
        clickHew(hewId) { reViewActivePanel(hewId, 'Hew') },
        domConf() { return domConf },
        domConfStringify() { return JSON.stringify(domConf, '', 2) },
    }
})
pageConf.component('t-hew', Hew).mount('#hew')
pageConf.mount('#pageConf')

import HewEp from '/f/7/libDomGrid/editPanel/HewEp.js'
import TreeEp from '/f/7/libDomGrid/editPanel/TreeEp.js'
createApp({
    data() { return { count: 0, } },
    mounted() { setDomComponent('actuallyEdit', this) },
    components: { HewEp, TreeEp },
    methods: {
        domConf() { return domConf },
        tagName() {
            console.log(domConf.activeEditObjName)
            return domConf.activeEditObjName + 'Ep'
        }
    }, template: `
<h3> Hi Edit</h3>
{{domConf().activeEditObjName}}:{{domConf().activeEditId}}
a12{{tagName()}}a12{{count}}
<component :is="tagName()"></component>
`,
}).mount('#actuallyEdit')
