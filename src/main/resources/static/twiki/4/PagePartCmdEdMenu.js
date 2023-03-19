'use strict'
import { pd } from '/fip/1/1/l1.js'
export default {
    props: { ppId: Number }, data() { return { count: 1 } },
    methods: {
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd_' + this.ppId) },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        a11
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
    style="right: -1em; width: 52em;">
    a222
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}