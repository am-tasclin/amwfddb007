'use strict'
import { confPP } from '/f/4/lib/metal.js'

const dropDownOpenId = dropDownOpenId => {
    confPP.dropDownOpenId == dropDownOpenId
        && delete confPP.dropDownOpenId
        || (confPP.dropDownOpenId = dropDownOpenId)
}

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    methods: {
        ppCmdEdOnOff() {
            dropDownOpenId('ppCmdEd_' + this.ppId)
            this.count++
        },
        dropDownOpenId() { return confPP.dropDownOpenId },
        confPP() { return confPP.ppId[this.ppId || 1] },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w13-small" >
        {{confPP().l_medas.join('|')}} ☰
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        :class="{'w3-show':dropDownOpenId() == 'ppCmdEd_'+ppId}" 
        style="right: -1em; width: 52em;">
        a123
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}