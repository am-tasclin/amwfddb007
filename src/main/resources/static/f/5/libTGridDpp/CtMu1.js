'use strict'
import {
    dppInteractivityPpId, dropDownOpenId
} from '/f/5/libTGridDpp/metalTGridDpp.js'

export default {
    props: { ppId: Number, }, data() { return { count: 0, } },
    mounted() {
        dppInteractivityPpId(this.ppId).ctMu1 = this
        setTimeout(() => {
            console.log(dropDownOpenId())
        }, 5000)
    }, template: `
<div :id="'contextMenu1_'+ppId" class="">
    Hi ContextMenu
</div> <span class="w3-hide">{{count}}</span>
`,
}