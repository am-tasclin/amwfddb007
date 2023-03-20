'use strict'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import { fipi } from '/fip/1/2/fipi.js'
!pd.ppCmdEd && (pd.ppCmdEd = {})
export default {
    props: { ppId: Number }, data() {
        console.log(123, Object.keys(wsDbC.fip))
        return { count: 1 }
    }, mounted() {
        pd.ppCmdEd[this.ppId] = this
    }, methods: {
        fip(fip) { return wsDbC.fip[fip] },
        ppsFipi() { return fipi.ppsFipi[this.ppId] },
        pps() { return fipi.ppsFipi && fipi.ppsFipi[this.ppId] && fipi.ppsFipi[this.ppId].pps },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd_' + this.ppId) },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
    {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
    style="right: -1em; width: 52em;">
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny am-b w3-border-bottom">URI, JSON</div>
                <div class="w3-opacity w3-tiny">
                    &nbsp;
                    {{ppId}}
                </div>
            </div>
            <div class="w3-threequarter w13-container w13-border-left">
                <div class="w3-row w3-tiny am-b w3-border-bottom">
                    <div class="w3-half"> pageParts </div> <div class="w3-half"> pane2, right </div>
                </div>
                <div class="w3-row w3-border-bottom" v-for="pp in pps()" class="w3-hover-shadow">
                    <div class="w3-half"> 
                        <span class="w3-opacity a1m-u">
                            {{pp}}: <span class="w3-small am-i"> {{fip(pp)}} </span>
                        </span>
                        <input :value="ppsFipi().json[pp].join(',')" class="w3-hover-shadow w3-small" style="width: 100%;">
                    </div>
                    <div class="w3-half w3-container w3-small">
                        a1
                        <span v-for="k2 in ppsFipi().json[pp]">
                            <template v-if="'lr'!=pp">
                                {{k2}}
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div> &nbsp;
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}