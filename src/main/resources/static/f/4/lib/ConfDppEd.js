'use strict'
import { confDppId, dppInteractivity } from '/f/4/lib/metal.js'
import ConfDppEdPanel from '/f/4/lib/ConfDppEdPanel.js'

export default {
    components: { ConfDppEdPanel, },
    props: { ppId: Number }, data() { return { count: 0, } },
    mounted() {
        dppInteractivity.fn.ppId(this.ppId).confDppEd = { aco: this }
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        keyEscEvent() {
            delete dppInteractivity.dropDownOpenId
            this.count++
        },
        dropDownOpenId() { return dppInteractivity.dropDownOpenId },
        clickFixFly() {
            const dropDownOpenId = (!dppInteractivity.dropDownOpenId.includes('confDppEdPanel_fly_')
                && 'confDppEdPanel_fly_' || 'confDppEdPanel_fixed_') + this.ppId
            dppInteractivity.clickDropDownOpenId(dropDownOpenId)
            // this.count++
            Object.keys(dppInteractivity.fn.ppId(this.ppId)).filter(k => k.includes('ppConfEd_'))
                .forEach(k => dppInteractivity.fn.ppId(this.ppId)[k]
                    .medasConfTypeName = dppInteractivity.medasConfTypeName)
        }, ppCmdEdOnOff() {
            const dropDownOpenId = 'confDppEdPanel_fly_' + this.ppId
            console.log(dropDownOpenId)
            dppInteractivity.clickDropDownOpenId(dropDownOpenId)
            this.count++
        }, closeDialog() {
            // delete dppInteractivity.dropDownOpenId
            dppInteractivity.clickDropDownOpenId('')
            this.count++
        },
    },
    template: `
<div class="w3-right">
    <span class="w3-dropdown-click w3-right">
        <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
            🪄 <span class="w3-tiny">  {{confDpp().l_medas.join('‧')}} </span> ☰
        </button>
        <div :id="'ppCmdEd_fly_'+ppId" class="w3-dropdown-content w13-container w3-hover-shadow w3-border"
                :class="{'w3-show':dropDownOpenId() == 'confDppEdPanel_fly_'+ppId}" 
                style="right: -1em; width: 52em;">
            <span class="w3-right">
                <button @click="clickFixFly" class=" w3-btn">📌</button>
                <button @click="closeDialog" class=" w3-btn">❌</button>
            </span>
            <ConfDppEdPanel :ppId="ppId" ff="fly"/>
        </div>
    </span>
</div> <span class="w3-hide">{{count}}</span>
<div v-if="dropDownOpenId() == 'confDppEdPanel_fixed_'+ppId">&nbsp;</div>
<div :id="'ppCmdEd_fixed_'+ppId" class="w3-hover-shadow w3-border"
        :class="{'w3-show':dropDownOpenId() == 'confDppEdPanel_fixed_'+ppId,
            'w3-hide':dropDownOpenId() != 'confDppEdPanel_fixed_'+ppId, }" >
    <span class="w3-right">
        <button @click="clickFixFly" class="w3-btn">📌</button>
        <button @click="closeDialog" class="w3-btn">❌</button>
    </span>
    <ConfDppEdPanel :ppId="ppId" ff="fixed"/>
</div>
`,
}
