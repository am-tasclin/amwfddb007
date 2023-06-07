'use strict'
import { confPP } from '/f/4/lib/metal.js'
import { ppInteractivity } from '/f/4/lib/metal.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'

export default {
    components: { MCDataSort, }, props: { ppId: Number, ff: String },
    data() { return { medasConfTypeName: '', epl2Data: {}, count: 0, } },
    mounted() {
        const ppConfEdKey = 'ppConfEd_' + this.ff
        ppInteractivity.fn.ppId(this.ppId)[ppConfEdKey] = this

    }, methods: {
        confTypeName(showMedasConfTypeName) {
            this.medasConfTypeName = ppInteractivity.medasConfTypeName = showMedasConfTypeName
        }, confJsonStr() {
            return JSON.stringify(confPP, '', 2)
                .replace(/\s+]/g, ']')
                .replace(/\s+}/g, '}')
        },
    }, template: `
<div class="w3-container">
    <div class="w3-row">
        <div class="w3-quarter w13-border-right">
            <div class="w3-tiny w3-border-bottom">
                <span @click="confTypeName(showMedasConfTypeName)"
                        class="w3-hover-shadow am-b"
                        v-for="showMedasConfTypeName in ['URI','JSON']">
                    &nbsp; {{showMedasConfTypeName}},
                </span>
                <sub class="w3-right">
                    {{medasConfTypeName}}
                </sub>
            </div>
            <div v-if="'JSON'==medasConfTypeName" class="w3-opacity w3-tiny"
                    style="white-space: pre; overflow: auto;" >
                {{confJsonStr()}}
                <div>&nbsp;</div>
            </div>
        </div>
        <div class="w3-threequarter w3-container">
            Hi a123
        </div>
    </div>
</div> <span class="w3-hide">{{count}}</span>
`,
}