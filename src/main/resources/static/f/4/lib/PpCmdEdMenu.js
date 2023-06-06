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
        dropDownOpenId() { return ppInteractivity.dropDownOpenId },
        clickFixFly() {
            console.log(ppInteractivity.dropDownOpenId, ppInteractivity.dropDownOpenId.includes('ppCmdEd_fly_'))
            const dropDownOpenId = (!ppInteractivity.dropDownOpenId.includes('ppCmdEd_fly_')
                && 'ppCmdEd_fly_' || 'ppCmdEd_fixed_') + this.ppId
            console.log(dropDownOpenId)
            ppInteractivity.clickDropDownOpenId(dropDownOpenId)
            this.count++
        }, ppCmdEdOnOff() {
            console.log(ppInteractivity.dropDownOpenId)
            const dropDownOpenId = 'ppCmdEd_fly_' + this.ppId
            console.log(123, dropDownOpenId)
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
            a1
            <PpConfEd />
        </div>
    </span>
</div> <span class="w3-hide">{{count}}</span>
{{dropDownOpenId()}}
<div v-if="dropDownOpenId() == 'ppCmdEd_fixed_'+ppId">&nbsp;</div>
<div :id="'ppCmdEd_fixed_'+ppId" class="w3-hover-shadow w3-border"
        :class="{'w3-show':dropDownOpenId() == 'ppCmdEd_fixed_'+ppId,
            'w3-hide':dropDownOpenId() != 'ppCmdEd_fixed_'+ppId, }" >
    <button @click="closeDialog" class="w3-right w3-btn">❌</button>
    <button @click="clickFixFly" class="w3-right w3-btn">📌</button>
    
a123
<PpConfEd />
</div>
`,
}