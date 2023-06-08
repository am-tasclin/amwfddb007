'use strict'
import { confPP, ppInteractivity } from '/f/4/lib/metal.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'

export default {
    components: { MCDataSort, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    mounted() {
        const ppConfEdKey = 'ppConfEd_' + this.ff
        ppInteractivity.fn.ppId(this.ppId)[ppConfEdKey] = this
        !ppInteractivity.epl2Data &&
            confPP.ppId[this.ppId].l_medas.filter(medas => 'lr' != medas)
                .reduce((o, medas) => (o[medas] = confPP.ppId[this.ppId].medas[medas].epl2
                    && confPP.ppId[this.ppId].medas[medas].epl2.l_mcdId || []
                ) && o, ppInteractivity.epl2Data = {})
        this.epl2Data = ppInteractivity.epl2Data
    }, methods: {
        epl2Data(medas) { return ppInteractivity.epl2Data[medas] },
        confPP() { return confPP.ppId[this.ppId || 1] },
        confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = ppInteractivity.medasConfTypeName = showMedasConfTypeName
        }, confJsonStr() {
            return JSON.stringify(confPP, '', 2)
                .replace(/\s+]/g, ']')
                .replace(/\s+}/g, '}')
        }, medasMcdId(event, ppId, medas) {
            console.log(event.target.value.split(','), ppId, medas)
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
                <div v-for="medas in confPP().l_medas" class="w3-opacity w3-tiny"
                        style="white-space: pre; overflow: auto;">
                    <b> {{medas}}</b>,
                    {{confPP().medas[medas].l_mcdId.join(',')}}
                    <div v-if="confPP().medas[medas].ppl2">
                        <b>{{medas}}_ppl2</b>,
                        {{confPP().medas[medas].ppl2.l_mcdId.join(',')}}
                    </div>
                </div>
            </template>
        </div>
        <div class="w3-threequarter w3-container">
            <div class="w3-row w3-tiny am-b w3-border-bottom">
                <div class="w3-half"> pageParts </div>
                <div class="w3-half w3-container"> pane2, right </div>
            </div>
            <div v-for="medas in confPP().l_medas" class="w3-row w3-border-bottom w3-hover-shadow">
                <div class="w3-half">
                    <span class="w3-opacity a1m-u">{{medas}}</span>
                    <input @keyup.enter="medasMcdId($event, ppId, medas)" 
                        :value="confPP().medas[medas].l_mcdId.join(', ')"
                        class="w3-hover-shadow w3-small am-width-100pr">
                    <div class="w3-tiny">
                        <MCDataSort :ppId="ppId" :medas="medas" location="ppCmd"/>
                    </div>
                </div>
                <div class="w3-half w3-container">
                    &nbsp;
                    <input @keyup.enter="medasMcdId($event, ppId, medas, true)" 
                        :value="confPP().medas[medas].ppl2 && confPP().medas[medas].ppl2.l_mcdId.join(', ')"
                        v-if="'lr'==medas"
                        class="w3-hover-shadow w3-small am-width-100pr">
                        <div v-if="confPP().medas[medas].ppl2" class="w3-tiny">
                            <MCDataSort :ppId="ppId" :medas="medas" 
                                :location="medas+'_ppl2'"/>
                        </div>
                    <template v-if="'lr'!=medas">
                        <template v-for="mcdId in confPP().medas[medas].l_mcdId">
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