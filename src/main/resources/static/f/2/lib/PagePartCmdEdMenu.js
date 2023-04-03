'use strict'
import { fipi, fipiFn } from '/f/2/lib/fipi.js'
export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    mounted() {
        this.ppCmdEdOnOff()
    }, methods: {
        pps() { return fipi.ppId[this.ppId].l_pp },
        fip(fip) { return fipiFn.fip[fip] },
        ppIdFn() { return fipi.ppId[this.ppId] },
        ppCmdEdOnOff() { fipiFn.W3ShowOnOff('ppCmdEd_' + this.ppId) },
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 52em;">
        a1
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny w3-border-bottom">
                    <span v-for="ppcv in ['URI','JSON']" class="w3-hover-shadow am-b">
                        &nbsp; {{ppcv}}, </span>&nbsp;{{ppId}}
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
                        <input :value="ppIdFn().pp[pp].l_fipId.join(', ')" class="w3-hover-shadow w3-small" style="width: 100%;">
                    </div>
                    <div class="w3-half w3-container w3-small">
                        <span v-for="k2 in ppIdFn().pp[pp].l_fipId">
                            <template v-if="'lr'!=pp">
                                {{k2}},
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}