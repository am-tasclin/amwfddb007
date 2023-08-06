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
    methods: {
        confTree() { return confTree() },
        u_l() { return uniqueIdsForDbRead },
    }, template: `
<div v-for="adnId in confTree()[0].rootList">
    <t-mc-element :adnId="adnId" :treeRootId="adnId" path="tree,0" />
</div>
`,
})
app_treeDom.component('t-mc-element', McElement)
app_treeDom.mount('#treeDom')

import { actualeEdit, setDomComponent, getDomComponent, getActualeCompomentName } from
    '/f/7/libDomGrid/libDomGrid.js'
import AdnEditPanel from '/f/7/libDomGrid/AdnEditPanel.js'
const app_actualeEdit = createApp({
    data() { return { count: 0, } },
    mounted() {
        setDomComponent('actualeEdit', this)
        console.log(this)
    }, methods: {
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        actualeCompomentName() { return getActualeCompomentName() },
        click() {
            console.log(123, actualeEdit())
        }
    }
})
const x = app_actualeEdit.component('t-adn-edit-panel', AdnEditPanel)
console.log(x)
app_actualeEdit.mount('#actualeEdit')


import { setActualeCompomentName } from
    '/f/7/libDomGrid/libDomGrid.js'
createApp({
    mounted() {
        setDomComponent('devTest', this)
    },
    methods: {
        click() {
            setActualeCompomentName('devTest')
            console.log(123, getActualeCompomentName())
            getDomComponent('actualeEdit').count++
            getDomComponent('adnEditPanel').count++
        }
    }
}).mount('#devTest')
