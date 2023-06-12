'use strict'
import { confPP, ppInteractivity } from '/f/4/lib/metal.js'
import PpConfEd from '/f/4/lib/PpConfEd.js'

export default {
    components: { PpConfEd, },
    props: { ppId: Number }, data() { return { count: 0, } },
    mounted() {
        ppInteractivity.fn.ppId(this.ppId).ppCmdEd = this
    }, methods: {
        confPP() { return confPP.ppId[this.ppId || 1] },
        keyEscEvent() {
            delete ppInteractivity.dropDownOpenId
            this.count++
        },
        dropDownOpenId() { return ppInteractivity.dropDownOpenId },
        clickFixFly() {
            const dropDownOpenId = (!ppInteractivity.dropDownOpenId.includes('ppCmdEd_fly_')
                && 'ppCmdEd_fly_' || 'ppCmdEd_fixed_') + this.ppId
            ppInteractivity.clickDropDownOpenId(dropDownOpenId)
            // this.count++
            Object.keys(ppInteractivity.fn.ppId(this.ppId)).filter(k => k.includes('ppConfEd_'))
                .forEach(k => ppInteractivity.fn.ppId(this.ppId)[k]
                    .medasConfTypeName = ppInteractivity.medasConfTypeName)
        }, ppCmdEdOnOff() {
            const dropDownOpenId = 'ppCmdEd_fly_' + this.ppId
            ppInteractivity.clickDropDownOpenId(dropDownOpenId)
            this.count++
        }, closeDialog() {
            // delete ppInteractivity.dropDownOpenId
            ppInteractivity.clickDropDownOpenId('')
            this.count++
        },
    },
    template: `
<div class="w3-right">
    <span class="w3-dropdown-click w3-right">
        <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" 
            @keyup.esc="keyEscEvent" >
            🪄 <span class="w3-tiny">  {{confPP().l_medas.join('‧')}} </span> ☰
        </button>
        <div :id="'ppCmdEd_fly_'+ppId" class="w3-dropdown-content w13-container w3-hover-shadow w3-border"
                :class="{'w3-show':dropDownOpenId() == 'ppCmdEd_fly_'+ppId}" 
                style="right: -1em; width: 52em;">
            <button @click="clickFixFly" class="w3-right w3-btn">📌</button>
            <PpConfEd :ppId="ppId" ff="fly"/>
        </div>
    </span>
</div> <span class="w3-hide">{{count}}</span>
<div v-if="dropDownOpenId() == 'ppCmdEd_fixed_'+ppId">&nbsp;</div>
<div :id="'ppCmdEd_fixed_'+ppId" class="w3-hover-shadow w3-border"
        :class="{'w3-show':dropDownOpenId() == 'ppCmdEd_fixed_'+ppId,
            'w3-hide':dropDownOpenId() != 'ppCmdEd_fixed_'+ppId, }" >
    <span class="w3-right">
        <button @click="closeDialog" class="w3-btn">❌</button>
        <button @click="clickFixFly" class="w3-btn">📌</button>
    </span>
    <PpConfEd :ppId="ppId" ff="fixed"/>
</div>
`,
}