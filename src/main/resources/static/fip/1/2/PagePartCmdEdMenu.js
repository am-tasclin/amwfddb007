'use strict'
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
export default {
    methods: {
        fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd') },
    },
    mounted() { pd.ppCmdEd = this }, data() { return { count: 1, } },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff"
        class="w3-btn w3-ripple w3-padding-small w3-small">&nbsp;&nbsp;
            {{fipi().pps.join(',')}}&nbsp;☰&nbsp;
        </button> <span class="w3-hide"> {{count}} </span>
    <div id="ppCmdEd" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 30em;">
        &nbsp;
        <div v-for="pp in fipi().pps" class="w3-hover-shadow">
        <input :value="fipi().json[pp].join(',')" class="w3-hover-shadow">
        <span class="w3-opacity w3-right am-u">
            {{pp}}: <span class="w3-small am-i"> {{fip(pp)}} </span>
        </span>
        </div>
        &nbsp;
    </div>
</span> ❌
`,
}