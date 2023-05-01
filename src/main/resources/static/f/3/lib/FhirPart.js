'use strict'
export default {
    props: { adnId: Number, ppId: Number, fip: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    template:`
<div class="w3-hover-shadow">
    <span class="w3-small w3-hover-shadow"
    @click="adnClick">{{adnId}}</span>
</div>
    `,
}