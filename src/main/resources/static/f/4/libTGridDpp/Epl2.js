'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * Epl2 ── 
 */
export default {
    data() { return { count: 0, panelType:'Json', panelTypeL:['Json','Sql']} },
    methods: {
        setEpl2Type(pt) {
            this.panelType=pt
        },
    },
    template: `
<div class="w3-dropdown-hover">
    <button class="w3-btn w3-padding-small w3-white w3-tiny am-b">
        ☰ {{panelType}} </button>
    <div class="w3-dropdown-content w3-bar-block w3-border" >
        <a @click="setEpl2Type(pt)" v-for="pt in panelTypeL"
            class="w3-bar-item w3-button" >
            {{pt}}
        </a>
    </div>
</div>
    `
}