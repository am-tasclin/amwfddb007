'use strict'
import { cl } from '/f/3/lib/common_lib.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

export default {
    props: { ppId: Number }, data() { return { count: 0, ppIdStrHash: '' } },
    mounted() {
        // this.ppCmdEdOnOff()
    }, methods: {
        pps() { return fipiFn.pps(this.ppId) },
        ppCmdEdOnOff() { cl.W3ShowOnOff('ppCmdEd_' + this.ppId) },
        confUri() {
            fipi.ppId[this.ppId].forPpId = this.ppId
            this.ppIdStrHash = JSON.stringify(fipi.ppId[this.ppId], (k, v) =>
                !['pagePartCmdEdMenu', 'fhirPart', 'adnMenu', 'buildJson'].includes(k)
                && v || undefined)
        },
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 52em;">
        <button class="w3-btn w3-border w3-padding-small w3-tiny" @click="confUri">confUri</button>
        <div class="w3-tiny w3-border-bottom"> 
        <a :href="'#cj='+ppIdStrHash" target="_blank">{{ppIdStrHash}}</a>
        </div>
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
            a1
            </div>
            <div class="w3-threequarter w13-container w13-border-left">
            a2
            </div>
        </div>
        Hi a2
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}
