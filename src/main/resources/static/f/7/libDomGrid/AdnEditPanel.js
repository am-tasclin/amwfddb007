'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import {
    mcData, setDomComponent, getActualeCompomentName, actuallyEdit,
} from '/f/7/libDomGrid/libDomGrid.js'
import { dbSendVlStrData, dbSendInsertAdn, dbSendDeleteAdn1 } from
    '/f/7/libDbRw/libMcRDb.js'


const treeSelectedId = () => actuallyEdit().tree && actuallyEdit().tree.selectedId
    , adn = () => mcData.eMap[treeSelectedId()]

const isAdnEditPanelSubMenu = type => actuallyEdit().adnEditPanelSubMenu
    && actuallyEdit().adnEditPanelSubMenu[treeSelectedId()]
    && actuallyEdit().adnEditPanelSubMenu.activeId == treeSelectedId()
    && actuallyEdit().adnEditPanelSubMenu[treeSelectedId()].type == type
    , initAdnEditPanelSubMenu = () => {
        !actuallyEdit().adnEditPanelSubMenu && (actuallyEdit().adnEditPanelSubMenu = { activeId: treeSelectedId() })
            || (actuallyEdit().adnEditPanelSubMenu.activeId = treeSelectedId())
        !actuallyEdit().adnEditPanelSubMenu[treeSelectedId()] &&
            (actuallyEdit().adnEditPanelSubMenu[treeSelectedId()] = { edVlStr: adn().vl_str })
        return actuallyEdit().adnEditPanelSubMenu[treeSelectedId()]
    }
    , adnEditPanelSubMenuOnOff = type => !isAdnEditPanelSubMenu(type)
        && (initAdnEditPanelSubMenu().type = type)
        || delete actuallyEdit().adnEditPanelSubMenu[treeSelectedId()].type

export default {
    data() { return { count: 0, } },
    mounted() {
        setDomComponent('adnEditPanel', this)
    }, methods: {
        actuallyCompomentName() { return getActualeCompomentName() },
        treeSelectedId() { return treeSelectedId() },
        adn() { return adn() },
        deleteAdn() {
            console.log(1123, this.adn())
            dbSendDeleteAdn1({ adnId: this.adn().doc_id, p: this.adn().p })
        }, copyId() {
            return actuallyEdit().copyId
        }, copyAdnId() {
            actuallyEdit().copyId = this.adn().doc_id
            this.count++
        }, pasteAdnSibling() {
            const copyAdn = mcData.eMap[this.copyId]
            dbSendInsertAdn({ parent: adn().p, r: copyAdn.r, r2: copyAdn.r2 })
        }, insertAdnSibling() {
            !Object.keys(actuallyEdit().tree.mcElement).includes(treeSelectedId()) &&
                dbSendInsertAdn({ parent: adn().p })
        }, insertAdnChild() {
            dbSendInsertAdn({ parent: adn().doc_id })
        }, upOneLevel() {
            console.log(123)
        }, isEditStrMenu() {
            return isAdnEditPanelSubMenu('editStr')
        }, sendVlStrDb() {
            console.log(initAdnEditPanelSubMenu().edVlStr)
            dbSendVlStrData({
                adnId: treeSelectedId()
                , string: initAdnEditPanelSubMenu().edVlStr,
            }).then(() => {
                console.log(123)
            })
        }, setEdVlStr(vl) {
            initAdnEditPanelSubMenu().edVlStr = vl
        }, adnEditPanelSubMenu() {
            return actuallyEdit().adnEditPanelSubMenu[treeSelectedId()]
        }, editStrMenu() {
            adnEditPanelSubMenuOnOff('editStr')
            this.count++
        }, isSortMenu() {
            return isAdnEditPanelSubMenu('sort')
        }, sortMenu() {
            adnEditPanelSubMenuOnOff('sort')
            console.log(123)
            this.count++
        }

    }, template: `
<div class="w3-row" v-if="'tree'==actuallyCompomentName()">
    <span class="w3-right w3-tiny w3-opacity">
        <span v-if="copyId()">copyId:{{copyId()}} ‧ </span>
        <span class="w3-text-blue am-b"> {{treeSelectedId()}}</span> ‧ tree</span>
    <div class="w3-col" style="width: 6em;">
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

        <button @click="upOneLevel" class="w3-btn am-b w3-border-left" title="up one level - на один рівень вище" >🡖</button>

        <button @click="editStrMenu" :class="{'w3-light-grey':isEditStrMenu()}"
            class="w3-btn am-b w3-border-left w3-topbar" title="edit string value">✎</button>
        <button @click="sortMenu"  :class="{'w3-light-grey':isSortMenu()}"
            class="w3-btn am-b w3-border-left w3-topbar" title="sort sibling">⇅</button>
    </div>
</div>

<div v-if="isEditStrMenu()" class="w3-row">
    <div class="w3-col" style="width: 80%;">
        <textarea class="am-width-100pr w3-border" 
            :value="adnEditPanelSubMenu().edVlStr"
            @input="setEdVlStr($event.target.value)" />
    </div>
    <div class="w3-rest">
        <button @click="sendVlStrDb" class="w3-border w3-small">⛃  sendDb - відправити БД</button>
    </div>
</div>
<div v-if="isSortMenu()">
    <span class="w3-large w3-topbar">&nbsp;⇅&nbsp;</span>
    <button @click="sortUp" class="w3-btn" titlw="up">⬆</button>
    <button @click="sortDown" class="w3-btn" title="down">⬇</button>
    <button @click="sortFirst" class="w3-btn w3-border-left" title="toFirst">⮸</button>
    <button @click="sortEnd" class="w3-btn" style="transform: rotate(180deg);"
        title="toLast">⮸</button>
</div>

<span class="w3-hide">{{count}}</span>
`,
}
