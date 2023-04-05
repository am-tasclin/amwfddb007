'use strict'
import { cl } from '/f/2/lib/common_lib.js'
import { cci } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number }, data() { return { count: 0 } },
    methods: {
        cciStr01() {
            const s = JSON.stringify(cci, '', 2)
            const s2 = s
                .replace(/\s+}/g, '}')
                .replace(/{\s+"v/g, '{"v')
                .replace(/\[\s+/g, '[')
                .replace(/\s+\]/g, ' ]')
                .replace(/",\s+"/g, '","')
            console.log(s2)
            return s2
            // return cci
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
        style="right: -1em; width: 52em;">
        <div class="w3-opacity w3-tiny" style="white-space: pre; overflow: auto;">
            {{cciStr01()}}
        </div>
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}