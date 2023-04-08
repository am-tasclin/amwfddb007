'use strict'
import { cl } from '/f/2/lib/common_lib.js'
import { cci } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number }, data() { return { count: 0 } },
    mounted() {
        cci.ccId[this.ccId].calcCellConfMenu = this
        console.log(cci.ccId[this.ccId])
    }, methods: {
        cciStr01() {
            const j = JSON.parse(JSON.stringify(cci.ccId[this.ccId]
                , (k, v) => !['dataForCalc','calcCellConfMenu'].includes(k)
                    && v || undefined))
            const s2 = JSON.stringify(j, '', 2)
                .replace(/\s+}/g, '}')
                .replace(/\[\s+/g, '[')
                .replace(/\s+\]/g, ' ]')
                .replace(/",\s+"/g, '","')
                .replace(/{\s+"v/g, '{"v')
                .replace(/{\s+"fn/g, '{"fn')
            return s2
        },
        ccCmdEdOnOff() {
            cl.W3ShowOnOff('ccConfMenu_' + this.ccId)
            this.count++
        },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ccCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        config
        <i class="fa-solid fa-bars"></i>
    </button>
    <div :id="'ccConfMenu_'+ccId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 32em;">
        <div class="w3-opacity w3-tiny" style="white-space: pre; overflow: auto;">
            {{cciStr01()}}
        </div>
        &nbsp;
    </div>
</span> <span @click="count++" class="w13-hide w3-hover-shadow">{{count}} </span>
    `,
}