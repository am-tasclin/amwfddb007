'use strict'
import { pd } from '/fip/1/1/l1.js'
import { fipi } from '/fip/1/2/fipi.js'
export default {
    props: { ppId: Number }, data() { return { count: 1 } },
    methods: {
        fipi() { return fipi },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd_' + this.ppId) },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        {{fipi().ppsFipi[ppId].pps.join(',')}}&nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
    style="right: -1em; width: 52em;">
    a222
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}