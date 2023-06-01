'use strict'
import AdnMenu from '/f/4/lib/AdnMenu.js'

export default {
    props: { mcdId: Number, medas: String },
    components: { AdnMenu },
    template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="mcdId" />
    {{medas}}

    <span class="w3-tiny">text <span>

</div>
`,
}