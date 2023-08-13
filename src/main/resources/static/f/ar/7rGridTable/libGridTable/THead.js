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
    mounted() {
        gridTable(this.tagName).tHead = this
        console.log(gridTable(this.tagName).config)
    }, methods: {
        keys() { return gridTable(this.tagName).bodyColumns },
        head() { return gridTable(this.tagName).config },
        alias(k) { return this.head()[k] && this.head()[k].alias },
        classHead(k) {
            return (this.head().toAllHead && this.head().toAllHead.classHead || '') + ' ' +
                (this.head()[k] && this.head()[k].classHead || '')
        }
    }, template: `
<thead class="w3-white" :review="count">
    <tr v-if="head()">
        <th v-for="k in keys()" :class="classHead(k)" class="w3-tiny">
            {{alias(k)}}
        </th>
    </tr>
    <tr>
        <th class="w3-tiny w3-opacity am-n w3-border-left w3-border-bottom w3-hover-shadow"
                v-for="k in keys()">
            {{k}}
        <th>
    </tr>
</thead>
`,
}