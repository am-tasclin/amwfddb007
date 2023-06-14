'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * Dpp -- DOM Page Part
 * 
 * ConfDppEdPanel ── Edit dialog panel for config of Dpp 
 *  └─ MCDataSort
 */
import { confDppId, confDppMedasMcdId, dppInteractivity } from '/f/4/lib/metal.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'

export default {
    components: { MCDataSort, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    computed: {
    },
    mounted() {
        const ppConfEdKey = 'confDppEdPanel_' + this.ff
        dppInteractivity.fn.ppId(this.ppId)[ppConfEdKey] = this
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
                .replace(/\s+]/g, ']')
                .replace(/\s+}/g, '}')
        }, medasMcdId(event, medas) {
            console.log(dppInteractivity.appComponents)
            console.log(this.ppId, medas, confDppId(this.ppId))
            confDppMedasMcdId(event.target.value, this.ppId, medas)
        }
    }, template: `
<div class="w3-container">
    <div class="w3-row">
        <div class="w3-quarter w13-border-right">
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
                <div class="w3-half" title="MEtal DAta Structure" > medas </div>
                <div class="w3-half w3-container"> panel2, right </div>
            </div>
            <div v-for="medas in confDpp().l_medas" class="w3-row w3-border-bottom w3-hover-shadow">
                <div class="w3-half">
                    <span class="w3-opacity a1m-u">{{medas}}</span>
                    <input @keyup.enter="medasMcdId($event, medas)" 
                        :value="confDpp().medas[medas].l_mcdId.join(', ')"
                        class="w3-hover-shadow w3-small am-width-100pr">
                    <div class="w3-tiny">
                        <MCDataSort :ppId="ppId" :medas="medas" location="ppConfEd"/>
                    </div>
                </div>
                <div class="w3-half w3-container">
                    &nbsp;
                    <input @keyup.enter="medasMcdId($event, medas, true)" 
                        :value="confDpp().medas[medas].ppl2 && confDpp().medas[medas].ppl2.l_mcdId.join(', ')"
                        v-if="'lr'==medas"
                        class="w3-hover-shadow w3-small am-width-100pr">
                        <div v-if="confDpp().medas[medas].ppl2" class="w3-tiny">
                            <MCDataSort :ppId="ppId" :medas="medas" 
                                location="ppConfEd_ppl2"/>
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
