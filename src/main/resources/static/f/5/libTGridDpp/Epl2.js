'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * Epl2 ── 
 */

import { dppInteractivityPpId, confDppMedasEpl2 } from '/f/4/libTGridDpp/metalTGridDpp.js'
export default {
    data() {
        return {
            panelTypeL: ['Json', 'Sql'],
            panelType: confDppMedasEpl2(this.ppId, this.medas, this.mcdId).panelType ||
                'Json',
        }
    }, props: { ppId: Number, medas: String, mcdId: Number, },
    methods: {
        setEpl2Type(pt) {
            confDppMedasEpl2(this.ppId, this.medas, this.mcdId).panelType =
                this.panelType = pt
            dppInteractivityPpId(this.ppId).tGridDpp.count++
        },
    }, template: `
<div class="w3-dropdown-hover w3-right" >
    <button class="w3-btn w3-padding-small w3-white w3-tiny am-b">
         {{panelType}} ☰ </button>
    <div class="w3-dropdown-content w3-bar-block w3-border" style="right: -1em; ">
        <a @click="setEpl2Type(pt)" v-for="pt in panelTypeL"
            class="w3-bar-item w3-button" >
            {{pt}}
        </a>
    </div>
</div>
`,
}
