'use strict'
import { pd } from '/fip/1/1/l1.js'
export default {
    props: { adnId: Number, pp: String }, data() { return { count: 1, } },
    template: `
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        <button v-for="im in ['buildJSON','buildSQL']"
            class="w3-btn" @click="buildType(im)">{{im}}</button>
    </div> <span class="w3-hide"> {{count}} </span>
</span>
<button class="w3-small w3-btn w3-padding-small w3-leftbar"
    @click="buildSqlSelect()"> SELECT </button>
Hi SQL!
    `,
    methods: {
        buildSqlSelect(){
            console.log(this.adnId)
        },
        buildType(im) { pd.buildPanel2ConfType(im, this.adnId, this.pp) },
    },
}