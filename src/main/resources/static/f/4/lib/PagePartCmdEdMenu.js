'use strict'
import { confPP } from '/f/4/lib/metal.js'
import { ppInteractivity } from '/f/4/lib/metal.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'

const dropDownOpenId = dropDownOpenId => confPP.dropDownOpenId == dropDownOpenId
    && delete confPP.dropDownOpenId || (confPP.dropDownOpenId = dropDownOpenId)

export default {
    props: { ppId: Number }, data() { return { epl2Data: {}, medasConfTypeName: '', count: 0, } },
    components: { MCDataSort, },
    mounted() {
        ppInteractivity.fn.ppId(this.ppId).ppCmd = this
        confPP.ppId[this.ppId].l_medas.filter(medas => 'lr' != medas)
            .reduce((o, medas) => (o[medas] = []) && o, this.epl2Data)
    }, methods: {
        confPP() { return confPP.ppId[this.ppId || 1] },
        dropDownOpenId() { return confPP.dropDownOpenId },
        confPP() { return confPP.ppId[this.ppId || 1] },
        ppCmdEdOnOff() {
            dropDownOpenId('ppCmdEd_' + this.ppId)
            this.count++
        }, keyEscEvent() {
            delete confPP.dropDownOpenId
            this.count++
        }, medasMcdId(event, ppId, medas) {
            console.log(event.target.value.split(','), ppId, medas)
        }, confJsonStr() {
            return JSON.stringify(confPP, '', 2)
                .replace(/\s+]/g, ']')
                .replace(/\s+}/g, '}')
        }, confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = showMedasConfTypeName
        },
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
        <span class="w3-tiny"> {{confPP().l_medas.join('‧')}} </span> ☰
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        :class="{'w3-show':dropDownOpenId() == 'ppCmdEd_'+ppId}" 
        style="right: -1em; width: 52em;">

        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny w3-border-bottom">
                    <span @click="confTypeName(showMedasConfTypeName)"
                            class="w3-hover-shadow am-b"
                            v-for="showMedasConfTypeName in ['URI','JSON']">
                        &nbsp; {{showMedasConfTypeName}},
                    </span>
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
                        <span class="w3-opacity a1m-u">
                            {{medas}}
                        </span>
                        <input @keyup.enter="medasMcdId($event, ppId, medas)" 
                            :value="confPP().medas[medas].l_mcdId.join(', ')"
                            class="w3-hover-shadow w3-small am-width-100pr">
                        <div class="w3-tiny">
                            ⬍ <MCDataSort :ppId="ppId" :medas="medas" location="ppCmd"/>
                        </div>
                    </div>
                    <div class="w3-half w3-container">
                        &nbsp;
                        <input @keyup.enter="medasMcdId($event, ppId, medas, true)" 
                            :value="confPP().medas[medas].ppl2 && confPP().medas[medas].ppl2.l_mcdId.join(', ')"
                            v-if="'lr'==medas"
                            class="w3-hover-shadow w3-small am-width-100pr">
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

    </div>
</span> <span class="w3-hide">{{count}}</span>
`,
}