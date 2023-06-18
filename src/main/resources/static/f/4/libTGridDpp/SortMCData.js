'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * SortMCData ── 
 *  ├─ TGridDpp
 *  ├─ ConfDppEdPanel
 */
import { confDppId, dppInteractivity } from '/f/4/libTGridDpp/metalTGridDpp.js'

export default {
    props: { ppId: Number, medas: String, keysuffix: String }, data() { return { count: 0 } },
    computed: {
        sortMCDataKey() { return this.ppId + '_' + this.medas + '_' + this.keysuffix }
    }, mounted() {
        // console.log(this.sortMCDataKey)
        dppInteractivity.appComponents.sortMCData[this.sortMCDataKey] = this
    }, methods: {
        confPpMedas() {
            const ppMedas1 = confDppId(this.ppId).medas[this.medas]
            return ppMedas1[this.keysuffix.split('_')[1]] || ppMedas1
        }, sortMcdIdClick(mcdId) {
            dppInteractivity.fn.sortMcdIdClick(this.ppId, this.medas, this.keysuffix, mcdId)
        }
    }, template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
        @click="sortMcdIdClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}