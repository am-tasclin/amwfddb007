'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable, TBodyFn, getHeadKeyObject } from
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'
import moment from '/webjars/moment/2.29.4/dist/moment.js'

export default {
    data() { return { count: 0, } },
    props: { tagName: String },
    mounted() {
        gridTable(this.tagName).tBody = this
    }, methods: {
        isSelectedRow(r) {
            return TBodyFn.isSelectedRow(this.tagName, r)
        },
        selectRow(r) {
            TBodyFn.selectRow(this.tagName, r)
            this.count++
        },
        keys() { return gridTable(this.tagName).bodyColumnsA },


        body() {
            return gridTable(this.tagName).tableBody
        },

        head() {
            // console.log('getHead ',gridTable(this.tagName).headA) 
            return gridTable(this.tagName).head
        },

        tableHeightEm() { return gridTable(this.tagName).tableHeightEm },

        styleBody(c) {
            return getHeadKeyObject(this.tagName, c).classBody
        },


        formatingFild(cellValue, cn) {
            cellValue = getHeadKeyObject(this.tagName, cellValue).formatBody
            switch (cellValue.substr(0, 5)) {
                case "dat_1":
                    return moment().format('DD.MM.YY')
                    break;
                case "str_1":
                    cn = cn.substr(cellValue.substr(5, cellValue.search(',') - 5), cellValue.substr(cellValue.search(',') + 1))
                    return cn
                    break;
                default: return cn
            }
            return cn
        },
    }, template: `
<tbody :review="count" >
    <tr @click="selectRow(r)" v-for="r in body()" class="w3-hover-shadow"        >
    <td v-for="c in keys()" 
    :class="styleBody(c)"
    >
        {{formatingFild(c,r[c])}} 
        </td>
    </tr>
</tbody>
`,
}