'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcData, setDomComponent, getActualeCompomentName, actualeEdit } from
    '/f/7/libDomGrid/libDomGrid.js'
import { dbSendInsertAdn, dbSendDeleteAdn1 } from
    '/f/7/libDbRw/libMcRDb.js'

export default {
    data() { return { count: 0, copyId: 0 } },
    mounted() {
        setDomComponent('adnEditPanel', this)
    }, methods: {
        actualeCompomentName() { return getActualeCompomentName() },
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        adn() { return mcData.eMap[this.treeSelectedId()] },
        deleteAdn() {
            console.log(1123, this.adn())
            dbSendDeleteAdn1({ adnId: this.adn().doc_id, p: this.adn().p })
        }, copyAdnId() {
            this.copyId = this.adn().doc_id
            this.count++
        }, pasteAdnSibling() {
            const copyAdn = mcData.eMap[this.copyId]
            dbSendInsertAdn({ parent: this.adn().p, r: copyAdn.r, r2: copyAdn.r2 })
        }, insertAdnSibling() {
            !Object.keys(actualeEdit().tree.mcElement).includes(this.treeSelectedId()) &&
                dbSendInsertAdn({ parent: this.adn().p })
        }, insertAdnChild() {
            dbSendInsertAdn({ parent: this.adn().doc_id })
        }, upOneLevel() {
            console.log(123)
        }
    }, template: `
<div class="w3-row" v-if="'tree'==actualeCompomentName()">
    <span class="w3-right w3-tiny w3-opacity">
        <span v-if="copyId">copyId:{{copyId}} ‧</span>
        <span class="w3-text-blue am-b"> {{treeSelectedId()}}</span> 
            ‧ tree</span>
    <div class="w3-col" style="width: 9em;">
        <span class="w3-tiny ">
            <span class="w3-opacity w3-right w3-text-blue"> {{treeSelectedId()}} &nbsp;</span>
            <span class="am-b"> Adn edit panel: </span>
        </span>
    </div>
    <div class="w3-rest">
        <button @click="insertAdnChild" class="w3-border-left w3-btn am-b" title="addChild - додати дитину">˙＋</button>
        <button @click="insertAdnSibling" class="w3-btn am-b" title="addSibling - додати побратима">＋</button>
        <button @click="deleteAdn" class="w3-btn am-b" >－</button>
        <button @click="copyAdnId" class="w3-border-left w3-btn am-b" title="copy - копіювати">⧉</button>
        <button @click="pasteAdnSibling" class="w3-btn am-b" title="paste sibling - вставити як побратима">⧠</button>
        <button @click="upOneLevel" class="w3-btn am-b w3-border-left" title="up one level - на один рівень вище" >🡔</button>
    </div>
</div><span class="w3-hide">{{count}}</span>
`,
}
