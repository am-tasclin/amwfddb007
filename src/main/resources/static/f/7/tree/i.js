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

import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds, readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

ws.onopen = event =>
    readAdnByIds(uniqueIdsForDbRead).then(() => {
        const uniqueParentId_l = uniqueParentIdPageRead()
        console.log(uniqueParentId_l)
        console.log(uniqueParentId_l.lenght)
        readAdnByParentIds(uniqueParentId_l).then(() =>
            uniqueParentId_l.forEach(parentId =>
                reViewAdn(parentId)
            )
        )
    })

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
    },
    methods: {
        showConf() {
            console.log(123)
            const x = domConfStrignify()
        },
        click() {
            setActualeCompomentName('devTest')
            getDomComponent('actualeEdit').count++
            getDomComponent('adnEditPanel').count++
        }
    }
}).mount('#devTest')
