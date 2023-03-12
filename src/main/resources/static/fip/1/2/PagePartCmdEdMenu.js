'use strict'
import { pd } from '/fip/1/1/l1.js'
export default {
    methods: {
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd') },
    },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff"
        class="w3-btn w3-ripple w3-padding-small w3-small">&nbsp;&nbsp;
        {ppMenuList.join(',')}}&nbsp;☰&nbsp;
        ppCmdEd
        </button>
    <div id="ppCmdEd" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 30em;">
        &nbsp;
        ppCmdEd
    </div>
</span>
`,
}