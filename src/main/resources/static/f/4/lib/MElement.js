'use strict'
import AdnMenu from '/f/4/lib/AdnMenu.js'
import { mcd } from '/f/4/lib/metal.js'


export default {
    props: { adnId: Number, medas: String },
    components: { AdnMenu },
    methods: {
        eMap() { return mcd.eMap[this.adnId] || {} }
    }, template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="adnId" />
    &nbsp;
    <span class="w3-tiny"> {{eMap().vStr}} <span>

</div>
`,
}