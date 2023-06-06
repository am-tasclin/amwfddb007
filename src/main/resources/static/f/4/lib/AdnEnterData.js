'use strict'
import { mcd, ppInteractivity } from '/f/4/lib/metal.js'

export default {
    props: { adnId: Number, ppMedasKey: String, editDataKey: String },
    data() { return { count: 0, vStr: mcd.eMap[this.adnId].vStr } },
    computed: { editComponentKey() { return this.editDataKey + this.adnId + this.ppMedasKey } },
    mounted() {
        ppInteractivity.fn.setAdnComponent(this.adnId, this.editComponentKey, this)
    }, methods: {
        enterData() {
            const edAdnId = ppInteractivity.dropDownOpenId.split('_')[2]
            console.log(edAdnId, ppInteractivity.dropDownOpenId, this.vStr)
            // TODO test stub
            mcd.eMap[this.adnId].vStr = this.vStr
            // this.count++
            Object.keys(ppInteractivity.appComponents.eMap[edAdnId])
                .filter(k => k.includes('mElement_'))
                .forEach(k => ppInteractivity.appComponents.eMap[edAdnId][k].count++)
        }, cleanEdit() {
            delete ppInteractivity.dropDownOpenId
            this.count++
            // const adnMenuKey = 'adnMenu_' + this.ppId + '_' + this.medas
            //     + '_' + (this.ppl2 && this.ppl2 || 1)
            // ppInteractivity.appComponents.eMap[this.adnId][adnMenuKey].count++
            Object.keys(ppInteractivity.appComponents.eMap[this.adnId])
                .filter(k => k.includes('adnMenu_'))
                .forEach(k => ppInteractivity.appComponents.eMap[this.adnId][k].count++)
        }
    },
    template: `
<div class="w3-container">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="vStr" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">send Db - відправити БД</button>
    <button @click="cleanEdit" class="w3-btn w3-tiny">close - закрити 
        <span class="w3-text-blue">－✎⧉ <span>
    </button>
    {{adnId}}
</div> <span class="w3-hide"> {{count}} </span>
`,
}