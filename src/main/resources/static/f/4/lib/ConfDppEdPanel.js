'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * Dpp -- DOM Page Part
 * 
 * ConfDppEdPanel ── Edit dialog panel for config of Dpp 
 *  └─ SortMCData
 */
import { confDppId, confDppMedasMcdId, dppInteractivity } from '/f/4/lib/metalTGridDpp.js'
import SortMCData from '/f/4/lib/SortMCData.js'

export default {
    components: { SortMCData, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    computed: { panelNameSuffix() { return 'confDppEdPanel_' + this.ff } },
    mounted() {
        const confDppEdPanelKey = 'confDppEdPanel_' + this.ff
        dppInteractivity.fn.ppId(this.ppId)[confDppEdPanelKey] = { aco: this }
        !dppInteractivity.epl2Data && confDppId(this.ppId).l_medas
            .filter(medas => 'lr' != medas)
            .reduce((o, medas) => (o[medas] = confDppId(this.ppId).medas[medas].epl2
                && confDppId(this.ppId).medas[medas].epl2.l_mcdId || []
            ) && o, dppInteractivity.epl2Data = {})
        this.epl2Data = dppInteractivity.epl2Data
    }, methods: {
        epl2Data(medas) { return dppInteractivity.epl2Data[medas] },
        confDpp() { return confDppId(this.ppId) },
        confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = dppInteractivity.medasConfTypeName = showMedasConfTypeName
        }, confJsonStr() {
            return JSON.stringify(confDppId(this.ppId), '', 2)
                .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
                .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '","')
        }, medasMcdId(event, medas) {
            console.log(dppInteractivity.appComponents)
            console.log(this.ppId, medas, confDppId(this.ppId))
            confDppMedasMcdId(event.target.value, this.ppId, medas)
        }, clickFixFly() {
            const dropDownOpenId = (!dppInteractivity.dropDownOpenId.includes('confDppEdPanel_fly_')
                && 'confDppEdPanel_fly_' || 'confDppEdPanel_fixed_') + this.ppId
            dppInteractivity.clickDropDownOpenId(dropDownOpenId, this.ppId)
            // this.count++
            Object.keys(dppInteractivity.fn.ppId(this.ppId)).filter(k => k.includes('ppConfEd_'))
                .forEach(k => dppInteractivity.fn.ppId(this.ppId)[k]
                    .medasConfTypeName = dppInteractivity.medasConfTypeName)
        }, closeDialog() {
            // delete dppInteractivity.dropDownOpenId
            dppInteractivity.clickDropDownOpenId('', this.ppId)
            this.count++
        }
    }, template: `
<div class="">
    
    <div class="w3-row">
        <div class="w3-quarter w13-border-right w3-container">
            <div class="w3-tiny w3-border-bottom">
                <span @click="confTypeName(showMedasConfTypeName)"
                        class="w3-hover-shadow am-b"
                        v-for="showMedasConfTypeName in ['URI','JSON']">
                    &nbsp; {{showMedasConfTypeName}},
                </span>
                <sub class="w3-right">
                    {{medasConfTypeName}}
                </sub>
            </div>
            <div v-if="'JSON'==medasConfTypeName" class="w3-opacity w3-tiny"
                    style="white-space: pre; overflow: auto;" >
                {{confJsonStr()}}
                <div>&nbsp;</div>
            </div>
            <template v-else>
                <div v-for="medas in confDpp().l_medas" class="w3-opacity w3-tiny"
                        style="white-space: pre; overflow: auto;">
                    <b> {{medas}}</b>,
                    {{confDpp().medas[medas].l_mcdId.join(',')}}
                    <div v-if="confDpp().medas[medas].ppl2">
                        <b>{{medas}}_ppl2</b>,
                        {{confDpp().medas[medas].ppl2.l_mcdId.join(',')}}
                    </div>
                </div>
            </template>
        </div>
        <div class="w3-threequarter w3-container">
    
            <div class="w3-row w3-tiny am-b w3-border-bottom">
                <div class="w3-half w3-container" title="MEtal DAta Structure" > medas </div>
                <div class="w3-half "> panel2, right 
                    <span class="w3-right">
                        <button @click="clickFixFly" class="w3-btn">📌</button>
                        <button @click="closeDialog" class="w3-btn">❌</button>
                    </span>
                </div>
            </div>
            <div v-for="medas in confDpp().l_medas" class="w3-row w3-border-bottom w3-hover-shadow">
                <div class="w3-half">
                    <span class="w3-opacity a1m-u">{{medas}}</span>
                    <input @keyup.enter="medasMcdId($event, medas)" 
                        :value="confDpp().medas[medas].l_mcdId.join(', ')"
                        class="w3-hover-shadow w3-small am-width-100pr">
                    <div class="w3-tiny">
                        <SortMCData :ppId="ppId" :medas="medas" :keysuffix="panelNameSuffix"/>
                    </div>
                </div>
                <div class="w3-half w3-container">
                    &nbsp;
                    <input @keyup.enter="medasMcdId($event, medas, true)" 
                        :value="confDpp().medas[medas].ppl2 && confDpp().medas[medas].ppl2.l_mcdId.join(', ')"
                        v-if="'lr'==medas"
                        class="w3-hover-shadow w3-small am-width-100pr">
                        <div v-if="confDpp().medas[medas].ppl2" class="w3-tiny">
                            <SortMCData :ppId="ppId" :medas="medas" 
                                :keysuffix="panelNameSuffix+'_ppl2'"/>
                        </div>
                    <template v-if="'lr'!=medas">
                        <template v-for="mcdId in confDpp().medas[medas].l_mcdId">
                            <label><input v-model="epl2Data[medas]"
                                type="checkbox" :value="mcdId"/>&nbsp;{{mcdId}}</label>,
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div> <span class="w3-hide">{{count}}</span>
`,
}
