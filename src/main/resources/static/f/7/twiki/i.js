'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { initDomConfLogic, setDomComponent, getDomComponent } from
    '/f/7/libDomGrid/libDomGrid.js'
const domConf = initDomConfLogic(window.location.hash.substring(1))
console.log(domConf)

const reViewActivePanel = (adnId, activeEditObjName) => {
    domConf.activeEditObjName = activeEditObjName
    domConf.activeEditId = adnId
    console.log(domConf)
    getDomComponent('actuallyEdit').count++
}

const { createApp } = Vue
createApp({
    methods: {
        clickTree(treeId) { reViewActivePanel(treeId, 'Tree') },
        clickHew(hewId) { reViewActivePanel(hewId, 'Hew') },
        domConf() { return domConf },
        domConfStringify() { return JSON.stringify(domConf, '', 2) },
    }
}).mount('#domConf')

import Hew from '/f/7/libDomGrid/editPanel/Hew.js'
import Tree from '/f/7/libDomGrid/editPanel/Tree.js'
createApp({
    data() { return { count: 0, } },
    mounted() { setDomComponent('actuallyEdit', this) },
    components: { Hew, Tree },
    methods: {
        domConf() { return domConf },
        tagName() {
            console.log(domConf.activeEditObjName)
            return domConf.activeEditObjName
        }
    }, template: `
    <h3> Hi Edit</h3>
{{domConf().activeEditObjName}}:{{domConf().activeEditId}}
a12{{tagName()}}a12{{count}}
<component :is="tagName()"></component>
`,
}).mount('#actuallyEdit')
