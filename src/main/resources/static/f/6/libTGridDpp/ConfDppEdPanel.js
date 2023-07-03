'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * Dpp -- DOM Page Part
 * 
 * ConfDppEdPanel ── Edit dialog panel for config of Dpp 
 *  └─ SortMCData
 */
import { confDppId, confMedasDd } from '/f/6/lib/confDomPagePart.js'
import { minSpaceJson } from '/f/6/lib/algoritmed-commons.js'
import { dppInteractivityPpId, setOpenedDropDownId, addDppIdComponentObj }
    from '/f/6/libTGridDpp/dppInteractivity.js'
import SortMCData from '/f/6/libTGridDpp/SortMCData.js'
const Okeys = Object.keys

const medasAddRemove = (ppId, medas) => {
    console.log(ppId, medas, dppInteractivityPpId(ppId))
    console.log(ppId, medas, dppInteractivityPpId(ppId).confDppEdPanel)
    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas
        && (confDppId(ppId).removeMedas = [])

    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas.includes(medas)
        && confDppId(ppId).removeMedas.push(medas)

    !confDppId(ppId).l_medas.includes(medas)
        && confDppId(ppId).l_medas.push(medas)
        && (confDppId(ppId).medas[medas] = { l_mcdId: [], mcdId: {} })

    reView(ppId)

}, medasRemoveFromConfDpp = (ppId, medas) => {
    console.log(medas, confDppId(ppId).removeMedas)
    confDppId(ppId).removeMedas
        .splice(confDppId(ppId).removeMedas.indexOf(medas), 1)
    confDppId(ppId).l_medas
        .splice(confDppId(ppId).l_medas.indexOf(medas), 1)
    delete confDppId(ppId).medas[medas]

    reView(ppId)

}, reView = ppId => dppInteractivityPpId(ppId).tGridDpp.count++ &&
    Okeys(dppInteractivityPpId(ppId).confDppEdPanel).forEach(ff =>
        dppInteractivityPpId(ppId).confDppEdPanel[ff].count++)

export default {
    components: { SortMCData, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    mounted() {
        addDppIdComponentObj(this.ppId, 'confDppEdPanel')[this.ff] = this
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        getConfMedasDd() { return confMedasDd },
        confJsonStr0() { return JSON.stringify(this.confDpp()) },
        confJsonStr() { return minSpaceJson(this.confDpp()) },
        medasAddRemove(medas) { medasAddRemove(this.ppId, medas) },
        medasRemoveFromConfDpp(medas) { medasRemoveFromConfDpp(this.ppId, medas) },
        medasRemoveFromRemove(medas) {
            this.confDpp().removeMedas
                .splice(this.confDpp().removeMedas.indexOf(medas), 1)
            reView(this.ppId)
        }, isMedasToRemove(medas) {
            return this.confDpp().removeMedas && this.confDpp().removeMedas.includes(medas)
        }, closeDialog() {
            setOpenedDropDownId('confDppEd_')
            delete this.confDpp().ffDppEd
            dppInteractivityPpId(this.ppId).confDppEd.count++
        }, clickFixFly() {
            this.confDpp().ffDppEd = this.confDpp().ffDppEd == 'fix'
                && 'fly' || 'fix'
            dppInteractivityPpId(this.ppId).confDppEd.count++
        }, confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = showMedasConfTypeName
        }, initUriLink() {
            const dpp = this.confDpp()
            return dpp.l_medas.reduce((r, medas) => r += medas
                + (dpp.medas[medas] && (',' + dpp.medas[medas].l_mcdId) || '') + ';' +
                (dpp.medas[medas].ppl2 && (medas + '_ppl2' + ','
                    + dpp.medas[medas].ppl2.l_mcdId + ';') || '')
                + (dpp.medas[medas].epl2 && (medas + '_epl2' + ','
                    + Okeys(dpp.medas[medas].epl2.mcdId) + ';') || ''), '')
        },
    }, template: `
<div class="w3-row">
    <div class="w3-quarter w13-border-right w3-container">
        <div class="w3-border-bottom">
            <span @click="confTypeName(showMedasConfTypeName)"
                    class="w3-tiny w3-hover-shadow am-b"
                    v-for="showMedasConfTypeName in ['URI','JSON']">
                &nbsp; {{showMedasConfTypeName}},
            </span>
            <span class="w3-right w3-tiny">
                <sup>{{medasConfTypeName}}</sup>
            </span>
            <div class="w3-right w3-small w3-opacity am-i">
                <a :href="'#cj='+confJsonStr0()" v-if="'JSON'==medasConfTypeName">
                    Full pagePart Config.
                </a> <a :href="'#'+initUriLink()" v-else>
                    Use for start init only.
                </a>
            </div>
        </div>&nbsp;
        <div v-if="'JSON'==medasConfTypeName" class="w3-opacity w3-tiny"
                style="white-space: pre-wrap; overflow: auto;" >
            {{confJsonStr()}}
            <div>&nbsp;</div>
        </div>
        <div v-else>
            <div v-for="medas in confDpp().l_medas" class="w3-opacity w3-tiny"
                    style="white-space: pre-wrap; overflow: auto;">
                <b> {{medas}}</b>,
                {{confDpp().medas[medas].l_mcdId.join(',')}}
                <div v-if="confDpp().medas[medas].ppl2">
                    <b>{{medas}}_ppl2</b>,
                    {{confDpp().medas[medas].ppl2.l_mcdId.join(', ')}};
                </div>
            </div>
        </div>
    </div>
    <div class="w3-threequarter">
        <div class="w3-row w3-border-bottom">
            <div class="w3-half w3-container" title="MEtal DAta Structure">
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
        <div v-for="medas in confDpp().l_medas" class="w3-row w3-border-bottom">
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
                <div class="w3-tiny">
                    <button class="w3-btn w3-padding-small" @keyup.esc="closeDialog"> ᳑</button>
                    <SortMCData :ppId="ppId" :medas="medas" :keysuffix="'confDppEdPanel_'+ff"/>
                </div>
            </div>
            <div class="w3-half">
            a1
            </div>
        </div>
    </div>
</div> <span class="w3-hide">{{count}}</span>
`,
}