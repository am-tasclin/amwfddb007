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
import { confDppId, } from '/f/6/lib/confDomPagePart.js'
import { openedDropDownId, setOpenedDropDownId }
    from '/f/6/libTGridDpp/dppInteractivity.js'
export default {
    props: { ppId: Number }, data() { return { count: 0, } },
    mounted() {
        this.confDpp().ffDppEd = 'fly' //fix||fly
        console.log(123, this.confDpp())
    },
    methods: {
        confDpp() { return confDppId(this.ppId) },
        openedDropDownId() { return openedDropDownId() },
        isOpened(ff) { return 'confDppEd_'+ff == (openedDropDownId() + this.confDpp().ffDppEd) },
        ppCmdEdOnOff() {
            setOpenedDropDownId('confDppEd_')
            console.log(openedDropDownId() + this.confDpp().ffDppEd)
            this.count++
        },
    }, template: `
<div class="w3-right">
    <span class="w3-dropdown-click w3-right">
        <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
            🪄 <span class="w3-tiny">  {{confDpp().l_medas.join('‧')}} </span> ☰
        </button>
        <div  class="w3-card w3-dropdown-content" style="right: -1em; width: 52em;"
            :class="{'w3-show':isOpened('fly'), 'w3-hide':!isOpened('fly')}">
        a1
        </div>
    </span>
</div> <span class="w13-hide">{{count}}</span>
<div  class="w3-card"
    :class="{'w3-show':isOpened('fix'), 'w3-hide':!isOpened('fix')}">
a1
</div> <div v-if="isOpened('fix')">&nbsp;</div>

`,
}