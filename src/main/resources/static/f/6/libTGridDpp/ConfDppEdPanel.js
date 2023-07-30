'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * Dpp -- DOM Page Part
 * 
 * ConfDppEdPanel ── Edit dialog panel for config of Dpp 
 *  └─ SortMCData
 */
import SortMCData from '/f/6/libTGridDpp/SortMCData.js'
import { reViewSortMCData } from '/f/6/libTGridDpp/SortMCData.js'
import { mcd } from '/f/6/lib/MetaContentData.js'
import { minSpaceJson, notExistList } from '/f/6/lib/algoritmed-commons.js'
import { confDppId, confDppMedas, confMedasDd, confMedasEpl2, ppIdMedasPpl2Key } from
    '/f/6/lib/confDomPagePart.js'
import { readDppFromList, wsUpdateString } from '/f/6/lib/wsDbRw.js'
import { meMap, dppInteractivityPpId, setOpenedDropDownId, addDppIdComponentObj } from
    '/f/6/libTGridDpp/dppInteractivity.js'

const confDppMedasMcdId = (val, ppId, medas, ppl2) => {
    const valList = val.replace(/\s+/g, '').split(',').filter(im => im)
        , dppMedas = ppl2 != 2
            && confDppId(ppId).medas[medas]
            || confDppId(ppId).medas[medas].ppl2
            || (confDppId(ppId).medas[medas].ppl2 = { l_mcdId: [], mcdId: {} })
    valList.filter(mcdId => !dppMedas.mcdId[mcdId])
        .forEach(mcdId => dppMedas.mcdId[mcdId] = {})
    dppMedas.l_mcdId = valList

    reViewEdPanel_Grid(ppId)
    reViewSortMCData(ppId, ppIdMedasPpl2Key(ppId, medas, ppl2))
    return valList
}, medasAddRemove = (ppId, medas) => {
    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas
        && (confDppId(ppId).removeMedas = [])

    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas.includes(medas)
        && confDppId(ppId).removeMedas.push(medas)

    !confDppId(ppId).l_medas.includes(medas)
        && confDppId(ppId).l_medas.push(medas)
        && (confDppId(ppId).medas[medas] = { l_mcdId: [], mcdId: {} })

    reViewEdPanel_Grid(ppId)

}, medasRemoveFromConfDpp = (ppId, medas) => {
    confDppId(ppId).removeMedas
        .splice(confDppId(ppId).removeMedas.indexOf(medas), 1)
    confDppId(ppId).l_medas
        .splice(confDppId(ppId).l_medas.indexOf(medas), 1)
    delete confDppId(ppId).medas[medas]

    reViewEdPanel_Grid(ppId)

}, reViewEdPanel_Grid = ppId => dppInteractivityPpId(ppId).tGridDpp.count++ &&
    Okeys(dppInteractivityPpId(ppId).confDppEdPanel).forEach(ff =>
        dppInteractivityPpId(ppId).confDppEdPanel[ff].count++)

export default {
    components: { SortMCData, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', count: 0, epl2Data: {} } },
    computed: {
        isDomPage() { return window.location.pathname.split('/').includes('dom') }
    }, mounted() {
        addDppIdComponentObj(this.ppId, 'confDppEdPanel')[this.ff] = this
        this.confDpp().l_medas
            .filter(medas => confMedasEpl2.includes(medas))
            .filter(medas => confDppMedas(this.ppId, medas).epl2)
            .forEach(medas => this.epl2Data[medas] = Okeys(confDppMedas(this.ppId, medas).epl2.mcdId))
    }, methods: {
        sendDbConfDpp() {
            wsUpdateString({
                adnId: this.ppId,
                string: this.initUriLink(),
            }).then(json => {
                console.log(json)
            })
        },
        inputEpl2(medas, mcdId) {
            const epl2McdId = confDppMedas(this.ppId, medas).epl2.mcdId
            !Okeys(epl2McdId).includes(mcdId) && (epl2McdId[mcdId] = {})
                || delete epl2McdId[mcdId]
            dppInteractivityPpId(this.ppId).tGridDpp.count++
        },
        confDpp() { return confDppId(this.ppId) },
        getConfMedasDd() { return confMedasDd },
        confPpMedas1p(medas) { return confDppMedas(this.ppId, medas) },
        isEpl2(medas) { return confMedasEpl2.includes(medas) },
        confJsonStr0() { return JSON.stringify(this.confDpp()) },
        confJsonStr() { return minSpaceJson(this.confDpp()) },
        medasAddRemove(medas) { medasAddRemove(this.ppId, medas) },
        medasRemoveFromConfDpp(medas) { medasRemoveFromConfDpp(this.ppId, medas) },
        medasRemoveFromRemove(medas) {
            this.confDpp().removeMedas
                .splice(this.confDpp().removeMedas.indexOf(medas), 1)
            reViewEdPanel_Grid(this.ppId)
        }, isMedasToRemove(medas) {
            return this.confDpp().removeMedas && this.confDpp().removeMedas.includes(medas)
        }, closeDialog() {
            setOpenedDropDownId('confDppEd_')
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
        }, editMedasMcdId(event, medas, ppl2) {
            const valList = confDppMedasMcdId(event.target.value, this.ppId, medas, ppl2)
            const listToRead = notExistList(Okeys(mcd.eMap), valList)
            listToRead.length && readDppFromList(listToRead, () => {
                const mml = Okeys(meMap)
                listToRead.filter(mcdId => mml.includes(mcdId)).forEach(mcdId =>
                    Okeys(meMap[mcdId]).forEach(k => meMap[mcdId][k].count++))
            })
        }, addPpl2(medas) {
            console.log(medas, confDppMedas(this.ppId, medas))
            confDppMedas(this.ppId, medas).ppl2 = { mcdId: {}, l_mcdId: [] }
            reViewEdPanel_Grid(this.ppId)
        },reload(){
            window.location.href = '#'+this.confJsonStr0()
        }
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
                <a :href="'#cj='+confJsonStr0()" 
                @click="reload"
                v-if="'JSON'==medasConfTypeName">
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
        <span class="w3-dropdown-hover">
            <button class="w3-btn w3-padding-small w3-white w3-tiny am-b"
                    title="MEtal DAta Structure" >
                medas</button>
            <div class="w3-dropdown-content w3-bar-block w3-border"
                    style="width:20em;">
                <a class="w3-bar-item w3-button"
                    @click="medasAddRemove(medas)"
                        v-for="(v,medas) in getConfMedasDd()">
                    <span class="w3-tiny">{{medas}}: &nbsp;</span>{{v}} </a>
            </div>
        </span> &nbsp;
        <button v-if="!isDomPage" @click="sendDbConfDpp"
                class="w3-btn w3-padding-small w3-tiny am-b w3-border-bottom" >
            send DB - відправити БД </button>
        <span class="w3-right">
            <span class="w3-tiny w3-center am-b w3-border-bottom">panel2, right</span>
            <button @click="clickFixFly" class="w3-btn">📌</button>
            <button @click="closeDialog" class="w3-btn">❌</button>
        </span>
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
                <input @keyup.enter="editMedasMcdId($event, medas)"
                    :value="confDpp().medas[medas].l_mcdId.join(', ')"
                    class="w3-hover-shadow w3-small am-width-100pr">
                <div class="w3-tiny">
                    <button class="w3-btn w3-padding-small" @keyup.esc="closeDialog"> ᳑</button>
                    <SortMCData :ppId="ppId" :medas="medas" :keysuffix="'confDppEdPanel_'+ff"/>
                </div>
            </div>
            <div class="w3-half w3-container">
                <template v-if="isEpl2(medas)">
                	<sub class="w3-right">epl2</sub>

                    <template v-for="mcdId in confDpp().medas[medas].l_mcdId">
                        <label><input :value="mcdId" v-model="epl2Data[medas]" 
                        @click="inputEpl2(medas,mcdId)" type="checkbox"
                             />&nbsp;{{mcdId}}</label>,
                    </template>

                </template>
                <template v-else>
                    <button v-if="!confPpMedas1p(medas).ppl2" class="w3-btn w3-right w3-small" 
                    	@click="addPpl2(medas)" > add panel2 </button>
                    <div v-else>&nbsp;
                        <input @keyup.enter="editMedasMcdId($event, medas, 2)" v-if="!isEpl2(medas)"
                            :value="confDpp().medas[medas].ppl2 && confDpp().medas[medas].ppl2.l_mcdId.join(', ')"
                            class="w3-hover-shadow w3-small am-width-100pr">
                            <div v-if="confDpp().medas[medas].ppl2" class="w3-tiny">
                                <SortMCData :ppId="ppId" :medas="medas" ppl2="2"
                                    :keysuffix="panelNameSuffix"/>
                            </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div> <span class="w3-hide">{{count}}</span>
`,
}

const Okeys = Object.keys
