'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * Epl2 ── 
 */

import { confDppId } from '/f/4/libTGridDpp/metalTGridDpp.js'
export default {
    data() {
        return {
            panelTypeL: ['Json', 'Sql'],
            panelType: confDppId(this.ppId).medas[this.medas].epl2.mcdId[this.mcdId].panelType ||
                'Json',
        }
    }, props: { ppId: Number, medas: String, mcdId: Number, },
    methods: {
        setEpl2Type(pt) {
            confDppId(this.ppId).medas[this.medas].epl2.mcdId[this.mcdId].panelType =
                this.panelType = pt
        },
    }, template: `
<div class="w3-dropdown-hover">
    <button class="w3-btn w3-padding-small w3-white w3-tiny am-b">
        ☰ {{panelType}} </button>
    <div class="w3-dropdown-content w3-bar-block w3-border" >
        <a @click="setEpl2Type(pt)" v-for="pt in panelTypeL"
            class="w3-bar-item w3-button" >
            {{pt}}
        </a>
    </div>
</div>
`,
}