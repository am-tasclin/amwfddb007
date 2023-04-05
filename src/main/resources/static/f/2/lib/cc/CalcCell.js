'use strict'
import { cace } from '/f/2/lib/cc/cci.js'
import DataForCalc from '/f/2/lib/cc/DataForCalc.js'
import CalcCellConfMenu from '/f/2/lib/cc/CalcCellConfMenu.js'

export default {
    props: { ccId: Number },
    mounted() {
        console.log(cace.dMap)
    }, components: { DataForCalc, CalcCellConfMenu },
    methods: {
        l_c() { return Array(cace.tc.square_size[1]) },
        l_r() { return Array(cace.tc.square_size[0]) }
    },
    template: `
⌖ <button class="w3-btn w3-padding-small w3-ripple"> 𝑓± </button>
<span class="w3-right"> <CalcCellConfMenu :ccId="ccId"/> </span>
<div class="w3-row w3-border-top">
    <div class="w3-col w3-small" style="width:150px">
        <DataForCalc :ccId="ccId"/>
    </div>
    <div class="w3-rest ">
        <table><tr><th></th>
                <th v-for="(c,ic) in l_c()" class="w3-tiny w3-light-grey">
                    C{{ic}}
                </th>
            </tr>
            <tr v-for="(r,ir) in l_r()">
                <th class="w3-tiny w3-light-grey">R{{ir}}</th>
                <td class="w3-border-right w3-border-bottom"
                    v-for="(c,ic) in l_c()">
                </td>
            </tr>
        </table>
    </div>
</div>
    `,
}