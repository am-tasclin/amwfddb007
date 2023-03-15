'use strict'
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
export default {
    methods: {
        fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd') },
        inputPanelPart(event) {
            console.log(event.target)
            console.log(event.target.value)
        },
    },
    mounted() { pd.ppCmdEd = this }, data() { return { count: 1, } },
    template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff"
        class="w3-btn w3-ripple w3-padding-small w3-small">&nbsp;&nbsp;
            {{fipi().pps.join(',')}}&nbsp;☰&nbsp;
        </button> <span class="w3-hide"> {{count}} </span>
    <div id="ppCmdEd" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 50em;">
        
        <div class="w3-row">
            <div class="w3-quarter">
                <div class="w3-tiny am-b w3-border-bottom">URI, JSON</div>
                a1
            </div>
            <div class="w3-threequarter">
                <div class="w3-row w3-tiny am-b w3-border-bottom">
                    <div class="w3-half"> pageParts </div> <div class="w3-half"> pane2, right </div>
                </div>
                <div class="w3-row w3-border-bottom" v-for="pp in fipi().pps" class="w3-hover-shadow">
                    <div class="w3-half"> 
                        <span class="w3-opacity a1m-u">
                            {{pp}}: <span class="w3-small am-i"> {{fip(pp)}} </span>
                        </span>
                        <input :value="fipi().json[pp].join(',')" class="w3-hover-shadow w3-small" style="width: 100%;">
                    </div>
                    <div class="w3-half w3-container w3-small">
                    <span v-for="k2 in fipi().json[pp]">
                        <template v-if="'lr'!=pp">
                            <span class="w3-hover-shadow">
                                <label> <input type="checkbox" :value="k2"
                                    @input="inputPanelPart">&nbsp;
                                {{k2}}</label>
                            </span>,
                        </template>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        &nbsp;
    </div>
</span> ❌
`,
}