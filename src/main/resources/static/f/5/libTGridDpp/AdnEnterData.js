'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * ADN, adn -- Abstract Data Node
 * 
 * AdnEnterData ── ADN data editor
 * 
 */
import { mcd } from '/f/5/lib/MetaContentData.js'
import {
    dppInteractivity, setMeMapComponent
} from '/f/5/libTGridDpp/metalTGridDpp.js'

export default {
    props: { adnId: Number, ppMedasKey: String, editDataKey: String },
    data() { return { count: 0, vl_str: mcd.eMap[this.adnId].vl_str } },
    computed: { editComponentKey() { return this.editDataKey + this.adnId + this.ppMedasKey } },
    mounted() {
        setMeMapComponent(this.adnId, this.editComponentKey, this)
    }, methods: {
        enterData() {
            const edAdnId = dppInteractivity.dropDownOpenId.split('_')[2]
            console.log(edAdnId, dppInteractivity.dropDownOpenId, this.vl_str)
            // TODO test stub
            mcd.eMap[this.adnId].vl_str = this.vl_str
            // this.count++
            Object.keys(dppInteractivity.appComponents.eMap[edAdnId])
                .filter(k => k.includes('mElement_'))
                .forEach(k => dppInteractivity.appComponents.eMap[edAdnId][k].count++)
        }, cleanEdit() {
            delete dppInteractivity.dropDownOpenId
            this.count++
            // const adnMenuKey = 'adnMenu_' + this.ppId + '_' + this.medas
            //     + '_' + (this.ppl2 && this.ppl2 || 1)
            // dppInteractivity.appComponents.eMap[this.adnId][adnMenuKey].count++
            Object.keys(dppInteractivity.appComponents.meMap[this.adnId])
                .filter(k => k.includes('adnMenu_'))
                .forEach(k => dppInteractivity.appComponents.meMap[this.adnId][k].count++)
        }
    },
    template: `
<div class="w3-container">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="vl_str" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">send Db - відправити БД</button>
    <button @click="cleanEdit" class="w3-btn w3-tiny">close - закрити 
        <span class="w3-text-blue">－✎⧉ <span>
    </button>
    {{adnId}}
</div> <span class="w3-hide"> {{count}} </span>
`,
}
