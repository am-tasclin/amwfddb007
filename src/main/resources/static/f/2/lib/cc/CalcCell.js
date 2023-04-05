'use strict'
import { cace } from '/f/2/lib/cc/cci.js'
import DataForCalc from '/f/2/lib/cc/DataForCalc.js'

export default {
    props: { ccId: Number },
    mounted() {
        console.log(cace.dMap)
    }, components: { DataForCalc },
    methods: {
        l_c() { return Array(cace.tc.square_size[1]) },
        l_r() { return Array(cace.tc.square_size[0]) }
    },
    template: `
    <div class="w3-row">
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