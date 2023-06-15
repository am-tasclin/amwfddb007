'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCDataSort ── 
 *  ├─ TGridDpp
 *  ├─ ConfDppEdPanel
 */
import { confDppId, dppInteractivity } from '/f/4/lib/metal.js'

export default {
    props: { ppId: Number, medas: String, keysuffix: String }, data() { return { count: 0 } },
    computed: {
        mcDataSortKey() { return this.ppId + '_' + this.medas + '_' + this.keysuffix }
    }, mounted() {
        console.log(this.mcDataSortKey)
        dppInteractivity.appComponents.mcDataSort[this.mcDataSortKey] = this
    }, methods: {
        confPpMedas() {
            const ppMedas1 = confDppId(this.ppId).medas[this.medas]
            return ppMedas1[this.keysuffix.split('_')[1]] || ppMedas1
        }, mcdIdSortClick(mcdId) {
            dppInteractivity.fn.mcdIdSortClick(this.ppId, this.medas, this.keysuffix, mcdId)
        }
    }, template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
        @click="mcdIdSortClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}