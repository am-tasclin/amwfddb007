'use strict'
import AdnMenu from '/f/4/lib/AdnMenu.js'
import { mcd, ppInteractivity } from '/f/4/lib/metal.js'

export default {
    props: { adnId: Number, ppId:Number, medas: String, },data() { return { count: 0 } },
    components: { AdnMenu },
    mounted() {
        ppInteractivity.fn.setAdnComponent(this.adnId, 'mElement', this)
    }, methods: {
        eMap() { return mcd.eMap[this.adnId] || {} }
    }, template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="adnId" :ppId="ppId"/>
    &nbsp;
    <span class="w3-tiny"> {{eMap().vStr}} <span>
</div> <span class="w3-hide"> {{count}} </span>
`,
}