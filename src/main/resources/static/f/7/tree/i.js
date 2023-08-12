'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import {
    confTree, initDomConfLogic, domConfStrignify
    , uniqueIdPageRead, uniqueParentIdPageRead
    , actuallyEdit, setActuallyTreeObj, reViewAdn, addTreeFn
    , setDomComponent, getDomComponent
    , setActualeCompomentName, getActualeCompomentName
} from '/f/7/libDomGrid/libDomGrid.js'
import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds, readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = uniqueIdPageRead()
console.log(uniqueIdsForDbRead)

ws.onopen = event =>
    uniqueIdsForDbRead.length && readAdnByIds(uniqueIdsForDbRead).then(() => {
        const uniqueParentId_l = uniqueParentIdPageRead()
        uniqueParentId_l.length && readAdnByParentIds(uniqueParentId_l
        ).then(() => uniqueParentId_l.forEach(parentId => reViewAdn(parentId))
        ).then(() => !actuallyEdit().tree && setActuallyTreeObj(actuallyEdit().pathTreeStr))
    })

const { createApp } = Vue
import McElement from '/f/7/libDomGrid/McElement.js'
const app_treeDom = createApp({
    methods: {
        confTreeRootList() { return confTree()[0] && confTree()[0].rootList || [] },
        u_l() { return uniqueIdsForDbRead },
    }, template: `
<div v-for="adnId in confTreeRootList()">
    <t-mc-element :adnId="adnId" :treeRootId="adnId" path="tree,0" />
</div>
`,
})
app_treeDom.component('t-mc-element', McElement)
app_treeDom.mount('#treeDom')

import AdnEditPanel from '/f/7/libDomGrid/AdnEditPanel.js'

createApp({
    data() { return { count: 0, addTree: 0, } },
    mounted() {
        setDomComponent('actuallyEdit', this)
    }, methods: {
        addTreeFn() {
            addTreeFn(this.addTree)
        },
        treeSelectedId() { return actuallyEdit().tree && actuallyEdit().tree.selectedId },
        actuallyCompomentName() { return getActualeCompomentName() },
    }
}).component('t-adn-edit-panel', AdnEditPanel).mount('#actuallyEdit')

createApp({
    mounted() {
        setDomComponent('devTest', this)
    }, methods: {
        showConf() {
            console.log(123,123)
            domConfStrignify()
        }, click() {
            setActualeCompomentName('devTest')
            getDomComponent('actuallyEdit').count++
            getDomComponent('adnEditPanel').count++
        }
    }
}).mount('#devTest')
