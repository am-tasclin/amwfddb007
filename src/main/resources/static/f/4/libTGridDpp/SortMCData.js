'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * SortMCData ── 
 *  ├─ TGridDpp
 *  ├─ ConfDppEdPanel
 */
import { confDppId, mgdSortMcData, dppInteractivityPpId } from '/f/4/libTGridDpp/metalTGridDpp.js'

export default {
    props: { ppId: Number, medas: String, keysuffix: String }, data() { return { count: 0 } },
    computed: {
        sortMCDataKey() { return this.ppId + '_' + this.medas + '_' + this.keysuffix },
        isPl2() { return this.keysuffix.includes('_ppl2') },
    }, mounted() {
        const sortMcData = dppInteractivityPpId(this.ppId).sortMcData
            || (dppInteractivityPpId(this.ppId).sortMcData = {})
        sortMcData[this.sortMCDataKey] = this
    }, methods: {
        confPpMedas() {
            const ppMedas = !this.isPl2
                && confDppId(this.ppId).medas[this.medas]
                || confDppId(this.ppId).medas[this.medas].ppl2
            return ppMedas
        }, sortMcdIdClick(mcdId) {
            mgdSortMcData.sortMcdIdClick(this.ppId, this.medas, this.isPl2, mcdId)
        }
    }, template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
        @click="sortMcdIdClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}
