'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 * ConfDppEd ── Navigate Edit dialog panel for config of Dpp 
 *  └─ ConfDppEdPanel
 *      └─ MCDataSort
 * 
 */
import { confDppId, dppInteractivity } from '/f/4/lib/metalTGridDpp.js'
import ConfDppEdPanel from '/f/4/lib/ConfDppEdPanel.js'

export default {
    components: { ConfDppEdPanel, },
    props: { ppId: Number }, data() { return { count: 0, } },
    mounted() {
        dppInteractivity.fn.ppId(this.ppId).confDppEd = this
        // dppInteractivity.fn.ppId(this.ppId).confDppEd = { aco: this }
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        keyEscEvent() {
            delete dppInteractivity.dropDownOpenId
            this.count++
        },
        dropDownOpenId() { return dppInteractivity.dropDownOpenId },
        ppCmdEdOnOff() {
            const dropDownOpenId = 'confDppEdPanel_fly_' + this.ppId
            console.log(dropDownOpenId)
            dppInteractivity.clickDropDownOpenId(dropDownOpenId, this.ppId)
            this.count++
        },
    },
    template: `
<div class="w3-right">
    <span class="w3-dropdown-click w3-right">
        <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
            🪄 <span class="w3-tiny">  {{confDpp().l_medas.join('‧')}} </span> ☰
        </button>
        <div :id="'ppCmdEd_fly_'+ppId" class="w3-dropdown-content w13-container w3-hover-shadow w3-border"
                :class="{'w3-show':dropDownOpenId() == 'confDppEdPanel_fly_'+ppId}" 
                style="right: -1em; width: 52em;">
            <ConfDppEdPanel :ppId="ppId" ff="fly"/>
        </div>
    </span>
</div> <span class="w3-hide">{{count}}</span>
<div :id="'ppCmdEd_fixed_'+ppId" class="w3-card w3-border"
        :class="{'w3-show':dropDownOpenId() == 'confDppEdPanel_fixed_'+ppId,
            'w3-hide':dropDownOpenId() != 'confDppEdPanel_fixed_'+ppId, }" >
    <ConfDppEdPanel :ppId="ppId" ff="fixed"/>
</div>
<div v-if="dropDownOpenId() == 'confDppEdPanel_fixed_'+ppId">&nbsp;</div>
`,
}
