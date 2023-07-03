'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * SortMCData ── 
 *  ├─ TGridDpp
 *  ├─ ConfDppEdPanel
 */
import { confDppMedas, ppIdMedasPpl2Key } from '/f/6/lib/confDomPagePart.js'
import { addDppIdComponentObj, dppInteractivityPpId }
    from '/f/6/libTGridDpp/dppInteractivity.js'
const Okeys = Object.keys
export default {
    props: { ppId: Number, medas: String, ppl2: Number, keysuffix: String }, data() { return { count: 0 } },
    computed: {
        ppIdMedasPpl2Key() { return ppIdMedasPpl2Key(this.ppId, this.medas, this.ppl2) }
    }, mounted() {
        const sortMCDataKey = this.ppIdMedasPpl2Key + '_' + this.keysuffix
        // console.log(sortMCDataKey)
        addDppIdComponentObj(this.ppId, 'sortMcData')[sortMCDataKey] = this
    }, methods: {
        confPpMedas() { return confDppMedas(this.ppId, this.medas, this.ppl2) },
        sortMcdIdClick(mcdId) {
            const pplMedas = confDppMedas(this.ppId, this.medas, this.ppl2)
            pplMedas.l_mcdId = pplMedas.l_mcdId
                .splice(pplMedas.l_mcdId.indexOf(mcdId), 1).concat(pplMedas.l_mcdId)
            Okeys(dppInteractivityPpId(this.ppId).sortMcData)
                .filter(k => k.includes(this.ppIdMedasPpl2Key))
                .forEach(k => dppInteractivityPpId(this.ppId).sortMcData[k].count++)
            dppInteractivityPpId(this.ppId).tGridDpp.count++
        }
    }, template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
    @click="sortMcdIdClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}