'use strict'
import { mcd, ppInteractivity } from '/f/4/lib/metal.js'
import AdnMenu from '/f/4/lib/AdnMenu.js'

export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, },
    data() { return { count: 0, } },
    components: { AdnMenu },
    computed: {
        ppMedasKey() {
            return '_' + this.ppId + '_' + this.medas
                + '_' + (this.ppl2 && this.ppl2 || 1)
        },
    }, mounted() {
        ppInteractivity.fn.setAdnComponent(this.adnId
            , 'mElement' + this.ppMedasKey, this)
    }, methods: {
        vlStr() {
            // return this.eMap().vlStr
            // return marked.parse(this.eMap().vlStr)
            return this.eMap().vlStr && marked.parseInline(this.eMap().vlStr)
        },
        eMap() { return mcd.eMap[this.adnId] || {} },
    }, template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="adnId" :ppMedasKey="ppMedasKey" />
    &nbsp;
    <span class="w3-tiny" v-html="vlStr()" />
</div> <span class="w3-hide"> {{count}} </span>
`,
}