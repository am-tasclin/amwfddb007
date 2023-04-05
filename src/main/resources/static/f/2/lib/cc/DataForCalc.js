'use strict'
import { cci } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number }, data() { return { count: 0 } },
    methods: {
        cci() { return cci.ccId[this.ccId] },
        sortD(dId) {
            const oa = cci.ccId[this.ccId].l_dMap
            cci.ccId[this.ccId].l_dMap =
                oa.splice(oa.indexOf(dId), 1).concat(oa)

            cci.ccId[this.ccId].calcCellConfMenu.count++
            this.count++
        },
    }, mounted() {
        console.log(this.ccId, cci)
    }, template: `
        dMap:
        <span @click="sortD(dId)" class="w3-hover-shadow"
        v-for="dId in cci().l_dMap">
            &nbsp;{{dId}}, </span>

        <div v-for="k in cci().l_dMap" class="w3-hover-shadow">
            ⌖{{k}}:{{cci().dMap[k]}}
        </div> <span class="w3-hide"> {{count}} </span>
    `,
}