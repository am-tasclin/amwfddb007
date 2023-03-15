'use strict'
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipi } from '/fip/1/2/fipi.js'

export default {
    methods: {
        fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd') },
        inputPanelPart(event) {
            console.log(event.target)
            console.log(event.target.value)
        },
    }, mounted() {
        pd.cmd.W3ShowOnOff('ppCmdEd')
        pd.ppCmdEd = this
    }, data() {
        return {
            count: 1, pl2Ids: Object.keys(wsDbC.fip).reduce((n, pp) =>
                (n[pp] = fipi.pl2[pp] && Object.keys(fipi.pl2[pp]) || []) && n, {}),
        }
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff"
        class="w3-btn w3-ripple w3-padding-small w3-small">&nbsp;&nbsp;
            {{fipi().pps.join(',')}}&nbsp;☰&nbsp;
        </button> <span class="w3-hide"> {{count}} </span>
    <div id="ppCmdEd" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 52em;">
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny am-b w3-border-bottom">URI, JSON</div>
                <div class="w3-opacity w3-tiny" >
                &nbsp;
                <div v-for="pp in fipi().pps">
                    <span class="am-b">{{pp}}</span>,&nbsp;{{fipi().json[pp].join(', ')}};
                    <div v-if="pl2Ids[pp]">
                        <span class="am-b">p_{{pp}}</span>,&nbsp;{{pl2Ids[pp].join(', ')}}</div>
                    <div>&nbsp;</div>
                </div>
                </div>
            </div>
            <div class="w3-threequarter w13-container w13-border-left">
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
                                <label> <input type="checkbox" v-model="pl2Ids[pp]"
                                :value="k2" @input="inputPanelPart">&nbsp;
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