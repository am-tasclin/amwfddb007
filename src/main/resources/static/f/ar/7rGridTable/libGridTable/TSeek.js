'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'
export default {
    data() { return { count: 0, } },
    props: { tagName: String },
    methods: {
        keys() {
            console.log(123, gridTable(this.tagName).config)
            return gridTable(this.tagName).bodyColumns
        },
        conf(c) { return gridTable(this.tagName).config[c] || {} },
        inputSeekFn(c) {
            console.log(c, this.conf(c).seekValue)
            this.conf(c).seekMakeSql
                && this.conf(c).seekMakeSql()
        }
    },
    template: `
<tr><th v-for="c in keys()" class="w3-tiny">{{c}}</th></tr>
<tr><td v-for="c in keys()" :style="conf(c).style">
        <input v-if="conf(c).seekType" class="am-width-100pr"
            v-model="conf(c).seekValue"
            @keyup.enter="inputSeekFn(c)"
        />
    </td></tr>
`
}