'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { setDomComponent, getActualeCompomentName, actualeEdit } from
    '/f/7/libDomGrid/libDomGrid.js'
export default {
    data() { return { count: 0, } },
    mounted() {
        setDomComponent('adnEditPanel', this)
        console.log(this)
    }, methods: {
        actualeCompomentName() { return getActualeCompomentName() },
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        insertAdnChild() {
            console.log(1123)
        }
    }, template: `
<div :review="count" v-if="'tree'==actualeCompomentName()">
    <span  class="w3-right w3-tiny w3-opacity"> {{treeSelectedId()}} tree</span>
    <span class="w3-tiny am-b">
        Adn edit panel:
    <span>
    <button @click="insertAdnChild" class="w3-btn am-b" title="addChild - додати дитину">˙＋</button>
</div><span class="w3-hide">{{count}}<span>
`,
}