'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { initDomConfLogic, setDomComponent, getDomComponent } from
    '/f/7/libDomGrid/libDomGrid.js'
const domConf = initDomConfLogic(window.location.hash.substring(1))
console.log(domConf)

const reViewActivePanel = () => {
    console.log(domConf)
    getDomComponent('actuallyEdit').count++
}

const { createApp } = Vue
createApp({
    methods: {
        clickTree(treeId) {
            domConf.activeEditObjName = 'Tree'
            domConf.activeEditId = treeId
            reViewActivePanel()
        }, clickHew(hewId) {
            domConf.activeEditObjName = 'Hew'
            domConf.activeEditId = hewId
            reViewActivePanel()
        },
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
