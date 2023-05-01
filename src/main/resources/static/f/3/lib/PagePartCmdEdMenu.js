'use strict'
import { cl } from '/f/3/lib/common_lib.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 , ppIdStrHash:''} },
    methods:{
        pps() { return fipi.ppId[this.ppId].l_pp },
        ppCmdEdOnOff() { cl.W3ShowOnOff('ppCmdEd_' + this.ppId) },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 52em;">
        Hi a2
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}