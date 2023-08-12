'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import {
    confTree, initDomConfLogic, domConfStrignify
    , uniqueIdPageRead, uniqueParentIdPageRead
    , reViewAdn
} from '/f/7/libDomGrid/libDomGrid.js'
initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = uniqueIdPageRead()

console.log(uniqueIdsForDbRead)
console.log(!!uniqueIdsForDbRead.length,)

import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds, readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'
import { actualeEdit, setActuelTreeObj } from
    '/f/7/libDomGrid/libDomGrid.js'

ws.onopen = event =>
    uniqueIdsForDbRead.length && readAdnByIds(uniqueIdsForDbRead).then(() => {
        const uniqueParentId_l = uniqueParentIdPageRead()
        uniqueParentId_l.length && readAdnByParentIds(uniqueParentId_l
        ).then(() => uniqueParentId_l.forEach(parentId => reViewAdn(parentId))
        ).then(() => !actualeEdit().tree && setActuelTreeObj(actualeEdit().pathTreeStr))
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
import { setDomComponent, getDomComponent, getActualeCompomentName } from
    '/f/7/libDomGrid/libDomGrid.js'
createApp({
    data() { return { count: 0, } },
    mounted() {
        setDomComponent('actualeEdit', this)
    }, methods: {
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        actualeCompomentName() { return getActualeCompomentName() },
    }
}).component('t-adn-edit-panel', AdnEditPanel).mount('#actualeEdit')

import { setActualeCompomentName } from
    '/f/7/libDomGrid/libDomGrid.js'
createApp({
    mounted() {
        setDomComponent('devTest', this)
    }, methods: {
        showConf() {
            console.log(123)
            domConfStrignify()
        }, click() {
            setActualeCompomentName('devTest')
            getDomComponent('actualeEdit').count++
            getDomComponent('adnEditPanel').count++
        }
    }
}).mount('#devTest')
