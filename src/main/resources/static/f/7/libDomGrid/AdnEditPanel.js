'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcData, setDomComponent, getActualeCompomentName, actualeEdit, reViewAdn } from
    '/f/7/libDomGrid/libDomGrid.js'
import { dbSendInsertAdn, dbSendDeleteAdn1 } from
    '/f/7/libDbRw/libMcRDb.js'
import { readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

export default {
    data() { return { count: 0, copyId: 0 } },
    mounted() {
        setDomComponent('adnEditPanel', this)
        console.log(this)
    }, methods: {
        actualeCompomentName() { return getActualeCompomentName() },
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        adn() { return mcData.eMap[this.treeSelectedId()] },
        deleteAdn() {
            console.log(1123, this.adn())
            dbSendDeleteAdn1({ adnId: this.adn().doc_id }).then(json =>
                readAdnByParentIds([this.adn().p]).then(() =>
                    reViewAdn(this.adn().p)))
        }, copyAdnId() {
            this.copyId = this.adn().doc_id
            this.count++
        }, pasteAdnSibling() {
            const copyAdn = mcData.eMap[this.copyId]
            dbSendInsertAdn({ parent: this.adn().p, r: copyAdn.r, r2: copyAdn.r2 })
                .then(json => {
                    console.log(1123, json)
                })
        }, insertAdnSibling() {
            dbSendInsertAdn({ parent: this.adn().p }).then(json => {
                console.log(1123, json)
            })
        }, insertAdnChild() {
            dbSendInsertAdn({ parent: this.adn().doc_id }).then(json => {
                console.log(1123, json)
            })
        }
    }, template: `
<div  v-if="'tree'==actualeCompomentName()">
    <span  class="w3-right w3-tiny w3-opacity">
        <span v-if="copyId">copyId:{{copyId}} ‧</span>
        {{treeSelectedId()}} tree</span>
    <span class="w3-tiny am-b">
        Adn edit panel:
    </span>
    <button @click="insertAdnChild" class="w3-border-left w3-btn am-b" title="addChild - додати дитину">˙＋</button>
    <button @click="insertAdnSibling" class="w3-btn am-b" title="addSibling - додати побратима">＋</button>
    <button @click="deleteAdn" class="w3-btn am-b" >－</button>
    <button @click="copyAdnId" class="w3-border-left w3-btn am-b" title="copy - копіювати">⧉</button>
    <button @click="pasteAdnSibling" class="w3-btn am-b" title="paste sibling - вставити як побратима">⧠</button>

</div><span class="w3-hide">{{count}}<span>
`,
}