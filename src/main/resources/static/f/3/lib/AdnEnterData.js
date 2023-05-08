'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
export default {
    props: { adnId: Number, },
    data() { return { count: 0, value_22: pd.eMap[this.adnId].value_22 } },
    template: `
    <div class="w3-container">
        <span class="w3-tiny">Edit & Enter Adn Content Data</span>
        <div><textarea v-model="value_22" class="am-width-100pr" /></div>
        <button class="w3-btn w3-border">OK</button>
        {{adnId}}
    </div>
    `,
}
