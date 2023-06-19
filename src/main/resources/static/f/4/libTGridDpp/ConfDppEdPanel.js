'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * Dpp -- DOM Page Part
 * 
 * ConfDppEdPanel ── Edit dialog panel for config of Dpp 
 *  └─ SortMCData
 */

import SortMCData from '/f/4/libTGridDpp/SortMCData.js'
import {
    confDppId, confDppMedasMcdId, confMedasDd, confMedasEpl2,
    dppInteractivity, mgdConfDppEdPanel, minSpaceJson
} from '/f/4/libTGridDpp/metalTGridDpp.js'


export default {
    components: { SortMCData, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    computed: { panelNameSuffix() { return 'confDppEdPanel_' + this.ff } },
    mounted() {
        const confDppEdPanelKey = 'confDppEdPanel_' + this.ff
        dppInteractivity.fn.ppId(this.ppId)[confDppEdPanelKey] = this
        // dppInteractivity.fn.ppId(this.ppId)[confDppEdPanelKey] = { aco: this }
        !dppInteractivity.epl2Data && confDppId(this.ppId).l_medas
            .filter(medas => 'lr' != medas)
            .reduce((o, medas) => (o[medas] = confDppId(this.ppId).medas[medas].epl2
                && confDppId(this.ppId).medas[medas].epl2.l_mcdId || []
            ) && o, dppInteractivity.epl2Data = {})
        this.epl2Data = dppInteractivity.epl2Data
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        getConfMedasDd() { return confMedasDd },
        isEpl2(medas) { return confMedasEpl2.includes(medas) },
        epl2Click(medas, mcdId) { mgdConfDppEdPanel.epl2Click(this.ppId, medas, mcdId) },
        epl2Data(medas) { return dppInteractivity.epl2Data[medas] },
        confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = dppInteractivity.medasConfTypeName = showMedasConfTypeName
        }, confJsonStr() {
            return minSpaceJson(confDppId(this.ppId))
        }, medasMcdId(event, medas, isPpl2) {
            console.log(dppInteractivity.appComponents)
            console.log(this.ppId, medas, confDppId(this.ppId))
            confDppMedasMcdId(event.target.value, this.ppId, medas, isPpl2)
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
        }, isMedasToRemove(medas) {
            return confDppId(this.ppId).removeMedas && confDppId(this.ppId).removeMedas.includes(medas)
        }, medasRemoveFromConfDpp(medas) {
            mgdConfDppEdPanel.medasRemoveFromConfDpp(this.ppId, medas)
        }, medasRemoveFromRemove(medas) {
            mgdConfDppEdPanel.medasRemoveFromRemove(this.ppId, medas)
        }, medasAddRemove(medas) {
            mgdConfDppEdPanel.medasAddRemove(this.ppId, medas)
        },
    }, template: `
<div class="w3-row">
    <div class="w3-quarter w13-border-right w3-container">
        <div class="w3-tiny w3-border-bottom">
            <span @click="confTypeName(showMedasConfTypeName)"
                    class="w3-hover-shadow am-b"
                    v-for="showMedasConfTypeName in ['URI','JSON']">
                &nbsp; {{showMedasConfTypeName}},
            </span>
            <sub class="w3-right">{{medasConfTypeName}}</sub>
        </div>
        <div v-if="'JSON'==medasConfTypeName" class="w3-opacity w3-tiny"
                style="white-space: pre-wrap; overflow: auto;" >
            {{confJsonStr()}}
            <div>&nbsp;</div>
        </div>
        <template v-else>
            <div v-for="medas in confDpp().l_medas" class="w3-opacity w3-tiny"
                    style="white-space: pre-wrap; overflow: auto;">
                <b> {{medas}}</b>,
                {{confDpp().medas[medas].l_mcdId.join(',')}}
                <div v-if="confDpp().medas[medas].ppl2">
                    <b>{{medas}}_ppl2</b>,
                    {{confDpp().medas[medas].ppl2.l_mcdId.join(', ')}};
                </div>
            </div>
        </template>
    </div>
    <div class="w3-threequarter">
        <div class="w3-row  w3-border-bottom">
            <div class="w3-half w3-container" title="MEtal DAta Structure" > 
                <div class="w3-dropdown-hover">
                    <button class="w3-btn w3-padding-small w3-white w3-tiny am-b">
                        medas</button>
                    <div class="w3-dropdown-content w3-bar-block w3-border"
                            style="width:20em;">
                        <a class="w3-bar-item w3-button"
                            @click="medasAddRemove(medas)"
                                v-for="(v,medas) in getConfMedasDd()">
                            <span class="w3-tiny">{{medas}}: &nbsp;</span>{{v}} </a>
                    </div>
                </div>
            </div>
            <div class="w3-half">
            <span class="w3-tiny am-b">panel2, right</span>
                <span class="w3-right">
                    <button @click="clickFixFly" class="w3-btn">📌</button>
                    <button @click="closeDialog" class="w3-btn">❌</button>
                </span>
            </div>
        </div>
        <div v-for="medas in confDpp().l_medas" class="w3-row w3-border-bottom w3-hover-shadow">
            <div class="w3-half">
                <span class="w3-opacity">{{medas}}</span>&nbsp;
                <span class="w3-small w3-right w3-opacity a1m-u"> {{getConfMedasDd()[medas]}} </span>
                <span class="w3-text-red w3-small w3-right" v-if="isMedasToRemove(medas)">
                    ?  remove--вилучити
                    <button class="w3-btn w3-padding-small"
                        @click="medasRemoveFromConfDpp(medas)" >Yes</button>
                    <button class="w3-btn w3-border w3-padding-small"
                        @click="medasRemoveFromRemove(medas)" >No</button>
                    ?
                </span>
                <input @keyup.enter="medasMcdId($event, medas)" 
                    :value="confDpp().medas[medas].l_mcdId.join(', ')"
                    class="w3-hover-shadow w3-small am-width-100pr">
                <div class="w3-tiny">
                    <SortMCData :ppId="ppId" :medas="medas" :keysuffix="panelNameSuffix"/>
                </div>
            </div>
            <div class="w3-half w3-container">
                <sub class="w3-right" v-if="isEpl2(medas)">epl2</sub>
                &nbsp;
                <input @keyup.enter="medasMcdId($event, medas, true)" v-if="!isEpl2(medas)"
                    :value="confDpp().medas[medas].ppl2 && confDpp().medas[medas].ppl2.l_mcdId.join(', ')"
                    class="w3-hover-shadow w3-small am-width-100pr">
                    <div v-if="confDpp().medas[medas].ppl2" class="w3-tiny">
                        <SortMCData :ppId="ppId" :medas="medas" 
                            :keysuffix="panelNameSuffix+'_ppl2'"/>
                    </div>
                <template v-if="isEpl2(medas)">
                    <template v-for="mcdId in confDpp().medas[medas].l_mcdId">
                        <label><input v-model="epl2Data[medas]" @click="epl2Click(medas, mcdId)"
                            type="checkbox" :value="mcdId"/>&nbsp;{{mcdId}}</label>,
                    </template>
                </template>
            </div>
        </div>
    </div>
</div> <div>&nbsp;</div>
<span class="w3-hide">{{count}}</span>
`,
}
