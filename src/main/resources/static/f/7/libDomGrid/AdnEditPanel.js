'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import {
    mcData, setDomComponent, getActualeCompomentName, actualeEdit,
} from '/f/7/libDomGrid/libDomGrid.js'
import { dbSendInsertAdn, dbSendDeleteAdn1 } from
    '/f/7/libDbRw/libMcRDb.js'

const treeSelectedId = () => actualeEdit().tree && actualeEdit().tree.selectedId
    , adn = () => mcData.eMap[treeSelectedId()]

const isAdnEditPanelSubMenu = (adnId, type) => actualeEdit().adnEditPanelSubMenu &&
    actualeEdit().adnEditPanelSubMenu[adnId] && actualeEdit().adnEditPanelSubMenu[adnId].type == type
    , initAdnEditPanelSubMenu = adnId => (actualeEdit().adnEditPanelSubMenu || (actualeEdit().adnEditPanelSubMenu = {}))[adnId] ||
        (actualeEdit().adnEditPanelSubMenu[adnId] = {})
    , adnEditPanelSubMenuOnOff = (adnId, type) => !isAdnEditPanelSubMenu(adnId, type)
        && (initAdnEditPanelSubMenu(adnId).type = type)
        || delete actualeEdit().adnEditPanelSubMenu[adnId].type


export default {
    data() { return { count: 0, edVlStr: null } },
    mounted() {
        setDomComponent('adnEditPanel', this)
    }, methods: {
        actualeCompomentName() { return getActualeCompomentName() },
        treeSelectedId() { return treeSelectedId() },
        adn() { return adn()},
        deleteAdn() {
            console.log(1123, this.adn())
            dbSendDeleteAdn1({ adnId: this.adn().doc_id, p: this.adn().p })
        }, copyId() {
            return actualeEdit().copyId
        }, copyAdnId() {
            actualeEdit().copyId = this.adn().doc_id
            this.count++
        }, pasteAdnSibling() {
            const copyAdn = mcData.eMap[this.copyId]
            dbSendInsertAdn({ parent: adn().p, r: copyAdn.r, r2: copyAdn.r2 })
        }, insertAdnSibling() {
            !Object.keys(actualeEdit().tree.mcElement).includes(treeSelectedId()) &&
                dbSendInsertAdn({ parent: adn().p })
        }, insertAdnChild() {
            dbSendInsertAdn({ parent: adn().doc_id })
        }, upOneLevel() {
            console.log(123)
        }, isEditStrMenu() {
            return isAdnEditPanelSubMenu(treeSelectedId(), 'editStr')
        }, sendVlStrDb() {
            console.log(this.edVlStr)
        }, editStrMenu() {
            // !this.edVlStr && this.adn().vl_str && (this.edVlStr && this.adn().vl_str)
            adnEditPanelSubMenuOnOff(treeSelectedId(), 'editStr')
            this.count++
        }, isSortMenu() {
            return isAdnEditPanelSubMenu(treeSelectedId(), 'sort')
        }, sortMenu() {
            adnEditPanelSubMenuOnOff(treeSelectedId(), 'sort')
            console.log(123)
            this.count++
        }

    }, template: `
<div class="w3-row" v-if="'tree'==actualeCompomentName()">
    <span class="w3-right w3-tiny w3-opacity">
        <span v-if="copyId()">copyId:{{copyId()}} ‧ </span>
        <span class="w3-text-blue am-b"> {{treeSelectedId()}}</span> ‧ tree</span>
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
        <button @click="editStrMenu" :class="{'w3-light-grey':isEditStrMenu()}"
            class="w3-btn am-b w3-border-left w3-topbar" title="edit string value">✎</button>
        <button @click="sortMenu"  :class="{'w3-light-grey':isSortMenu()}"
            class="w3-btn am-b w3-border-left w3-topbar" title="sort sibling">⇅</button>
        <button @click="upOneLevel" class="w3-btn am-b w3-border-left" title="up one level - на один рівень вище" >🡖</button>
    </div>
</div>

<div v-if="isEditStrMenu()" class="w3-row">
    <div class="w3-col" style="width: 80%;">
        <textarea class="am-width-100pr" 
        :value="adn().vl_str" @input="edVlStr=$event.target.value" />
    </div>
    <div class="w3-rest">
        <button @click="sendVlStrDb" class="w3-border w3-small">⛃  sendDb - відправити БД</button>
    </div>
</div>
<div v-if="isSortMenu()">
    isSortMenu
</div>

<span class="w3-hide">{{count}}</span>
`,
}
// <textarea v-model="vl_str" class="am-width-100pr" />
// @input="writeVlStr($event.target.value)"
