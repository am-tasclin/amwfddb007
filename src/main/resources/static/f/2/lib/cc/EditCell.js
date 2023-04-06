'use strict'
import { cl } from '/f/2/lib/common_lib.js'
import { cci, caceFn } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number, ir: Number, ic: Number },
    data() { return { count: 0 } },
    methods: {
        n_vRC() { return caceFn.vRC(this.ccId, this.ir, this.ic) },
        openCell(){
            console.log(123)
            cl.W3ShowOnOff('cell_'+this.ccId+'_C'+this.ic+'R'+this.ir)
            this.count++
        },
        vRC() {
            return cci.ccId[this.ccId].dMap[caceFn.vRC
                (this.ccId, this.ir, this.ic)] && cci.ccId[this.ccId]
                    .dMap[caceFn.vRC(this.ccId, this.ir, this.ic)].v
        },
    }, template: `
<a :href="'#cell_'+ccId+'_C'+ic+'R'+ir" class="am-0u">
    <div class="w3-dropdown-click">
        <span @click="openCell">
            {{vRC()}}&nbsp;
            <span v-if="n_vRC()" class="w3-small" >
                ⌖{{n_vRC()}}
            </span>
        </span>
        <div :id="'cell_'+ccId+'_C'+ic+'R'+ir" class="w3-dropdown-content w3-container w3-hover-shadow w3-border">
            a2
            {{'cell_'+ccId+'_C'+ic+'R'+ir}}
        </div>
    </div>
</a> <span class="w3-hide"> {{count}} </span>`,
}