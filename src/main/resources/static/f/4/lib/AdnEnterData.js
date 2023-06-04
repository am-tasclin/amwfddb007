'use strict'
import { mcd } from '/f/4/lib/metal.js'

export default {
    props: { adnId: Number, },
    data() { return { count: 0, vStr: mcd.eMap[this.adnId].vStr } },
    methods: {
        enterData() {
            console.log(123, this.vStr)
            //TODO test stub
            mcd.eMap[this.adnId].vStr = this.vStr
            this.count++
        },
    },
    template: `
<div class="w3-container">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="vStr" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">send Db - відправити БД</button>
    {{adnId}}
</div> <span class="w3-hide"> {{count}} </span>
`,
}