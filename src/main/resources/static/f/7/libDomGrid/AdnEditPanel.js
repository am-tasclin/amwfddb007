'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { actualeEdit } from '/f/7/libDomGrid/libDomGrid.js'
export default {
    methods: {
        treeSelectedId() { return actualeEdit().tree && actualeEdit().tree.selectedId },
        insertAdnChild() {
            console.log(1123)
        }
    },
    template: `
<span class="w3-right w3-tiny w3-opacity"> {{treeSelectedId()}} </span>
<span class="w3-tiny am-b">
    Adn edit panel:
<span>
<button @click="insertAdnChild" class="w3-btn am-b" title="addChild - додати дитину">＋</button>

`,
}