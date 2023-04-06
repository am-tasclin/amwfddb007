'use strict'
import { cci, caceFn } from '/f/2/lib/cc/cci.js'
import DataForCalc from '/f/2/lib/cc/DataForCalc.js'
import CalcCellConfMenu from '/f/2/lib/cc/CalcCellConfMenu.js'
import EditCell from '/f/2/lib/cc/EditCell.js'

export default {
    props: { ccId: Number }, data() { return { count: 0 } },
    mounted() {
        console.log(caceFn, cci.ccId[this.ccId])
    }, components: { DataForCalc, CalcCellConfMenu, EditCell },
    methods: {
        cci() { return cci.ccId[this.ccId] },
        l_c() { return Array(caceFn.tc.square_size[1]) },
        l_r() { return Array(caceFn.tc.square_size[0]) },
        openEdCell(ic, ir) {
            console.log(ic, ir)
        },
    }, template: `
<div class="w3-border-bottom">&nbsp;
    <span class="w3-right"> 
        ⌖ <button class="w3-btn w3-padding-small w3-ripple"> 𝑓± </button>
        <CalcCellConfMenu :ccId="ccId"/> </span>
</div>
<div class="w3-row">
    <div class="w3-col w3-small" style="width:150px">
        <DataForCalc :ccId="ccId"/>
    </div>
    <div class="w3-rest">
        <table><tr><td class="w3-tiny w3-light-grey">
                <span class="w3-dropdown-hover">
                    <sub>R0</sub><sup>C0</sup>
                    <div class="w3-dropdown-content w3-small w3-border w13-container">
                    <span class="w3-tiny w3-right"> in dev </span>
                    <table>
                        <template v-for="(r,ir) in l_r()">
                        <tr v-if="ir>0">
                            <template v-for="(c,ic) in l_c()">
                            <td @click="openEdCell(ic,ir)"
                            v-if="ic>0" class="w3-hover-shadow">
                                C{{ic}}R{{ir}}
                            </td>
                            </template>
                        </tr>
                        </template>
                    </table>
                    </div>
                </span>
                </td>
            <template v-for="(c,ic) in l_c()">
                <th v-if="ic>0" class="w3-tiny w3-light-grey">C{{ic}}</th></template>
            </tr>
            <template v-for="(r,ir) in l_r()">
            <tr v-if="ir>0">
                <th class="w3-tiny w3-light-grey">R{{ir}}</th>
                <template v-for="(c,ic) in l_c()">
                <td v-if="ic>0" class="w3-border-right w3-border-bottom w3-hover-shadow" >
                    <EditCell :ccId="ccId" :ir="ir" :ic="ic"/>
                </td>
                <template>
            </tr>
            </template>
        </table>
        &nbsp;
        <p>
            &nbsp;
        </p>
    </div>
</div> <span class="w3-hide"> {{count}} </span>`,
}