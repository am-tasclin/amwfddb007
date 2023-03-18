'use strict'
import { pd } from '/fip/1/1/l1.js'
!pd.adnIdMenu && (pd.adnIdMenu = {})
export default {
    props: { adnId: Number }, data() { return { count: 1, } },
    mounted() { pd.adnIdMenu[this.adnId] = this },
    methods: { i(n) { return pd.i(this, n) }, },
    template: `
<span class="w3-dropdown-hover w3-hover-shadow w3-white">
    <span class="w3-tiny  w3-opacity">&nbsp;
        r: {{i('reference')}}, r2: {{i('reference2')}}&nbsp;
    </span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow"
        style="right: -1em;width: 14em;">
        <button class="w3-right w3-btn">
        {{this.adnId}}
        </button>
        <span class="w3-right w3-tiny">
            <span title="parent"> p: </span>
            <span class="am-b">↥</span>
            <span class="w3-hover-shadow">{{i('parent')}}</span>
            <span class="am-b">↥</span>,
        </span>
        <div class="w3-small">
            <span title="reference"> r: </span>
            <span class="w3-hover-shadow">{{i('reference')}}</span>,
            <span title="reference2"> r2: </span>
            <span class="w3-hover-shadow">{{i('reference2')}}</span>,
        </div>
        ⏻-MENU-☰
    </div> <span class="w3-hide"> {{count}} </span>
</span>
    `,
}