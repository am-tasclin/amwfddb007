'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 * ConfDppEd ── Navigate Edit dialog panel for config of Dpp 
 *  └─ ConfDppEdPanel
 *      └─ MCDataSort
 * 
 */
import ConfDppEdPanel from '/f/6/libTGridDpp/ConfDppEdPanel.js'
// import { closeEdAdnDialog } from '/f/6/libTGridDpp/AdnMenu.js'
import { confDppId } from '/f/6/lib/confDomPagePart.js'
import { getOpenedDropDownId, setOpenedDropDownId, addDppIdComponent, closeEdAdnDialog }
    from '/f/6/libTGridDpp/dppInteractivity.js'


export default {
    components: { ConfDppEdPanel, },
    props: { ppId: Number }, data() { return { count: 0, } },
    mounted() {
        // console.log(this.confDpp(), window.location.pathname.split('/').includes('dom'))
        !this.confDpp().ffDppEd &&
            (this.confDpp().ffDppEd = 'fly') //fix||fly
        addDppIdComponent(this.ppId, 'confDppEd', this)
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        isOpened(ff) { return 'confDppEd_' + ff == (getOpenedDropDownId() + this.confDpp().ffDppEd) },
        openedDropDownId() { return getOpenedDropDownId() },
        ppCmdEdOnOff() {
            getOpenedDropDownId() && getOpenedDropDownId().includes('edAdn_') &&
                closeEdAdnDialog(getOpenedDropDownId().split('_')[2])
            setOpenedDropDownId('confDppEd_')
            console.log(getOpenedDropDownId() + this.confDpp().ffDppEd)
            this.count++
        },
    }, template: `
<div class="w3-right">
    <span class="w3-dropdown-click w3-right">
        <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
            🪄 <span class="w3-tiny">  {{confDpp().l_medas.join('‧')}} </span> ☰
        </button>
        <div class="w3-card w3-dropdown-content" style="right: -1em; width: 52em;"
            :class="{'w3-show':isOpened('fly'), 'w3-hide':!isOpened('fly')}">
            <ConfDppEdPanel :ppId="ppId" ff="fly"/>
        </div>
    </span>
</div> <span class="w3-hide">{{count}}</span>

<div class="w3-card"
    :class="{'w3-show':isOpened('fix'), 'w3-hide':!isOpened('fix')}">
        <ConfDppEdPanel :ppId="ppId" ff="fix"/>
</div> <div v-if="isOpened('fix')">&nbsp;</div>
`,
}

const Okeys = Object.keys
