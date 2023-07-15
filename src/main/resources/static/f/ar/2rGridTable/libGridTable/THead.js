'use strict'
// import ddPersonal from '../ddPersonal.js'
import { getHead, headKeysWithChild, getBodyColumns } from './libGridTable.js'
const Okeys = Object.keys

export default {
    methods: {
        head() { return getHead() },
        keys() { return getBodyColumns() },
        headKeysWithChild() { return headKeysWithChild(getHead()) },
        h11eadKeysWithChild() { return getHead() && headKeysWithChild(getHead()) || [] },
        headSortClick(k) {
            console.log(k, getHead()[k])
        }, headSortClick2(k1, k) {
            console.log(k1, getHead()[k1])
            console.log(k1, k, getHead()[k1].child[k])
        },
        childCount(o) { return !o && 1 || Okeys(o).length }
    },
    template: `
<thead v-if="headKeysWithChild().length" class="w3-small w3-white">
    <tr>
        <th v-for="(v,k) in head()" class="w3-border w3-hover-shadow" 
			@click="headSortClick(k)" :style="v.style" :colspan="childCount(v.child)"
            :rowspan="headKeysWithChild().includes(k)&&1||2">
            {{v.alias}}
        </th>
    </tr>
    <tr>
        <template v-for="k1 in headKeysWithChild()">
            <th v-for="(v,k) in head()[k1].child" class="w3-border w3-hover-shadow"
                :style="v.style" @click="headSortClick2(k1,k)">
                {{v.alias}}
            </th>
        </template>
    </tr>
    <tr class="w3-small">
        <th v-for="(v) in keys()" class="w3-hover-border-red w3-border">{{v}}</th>
    </tr>
</thead>
<thead v-else class="w3-small">
    <tr>
        <th v-for="(v,k) in head()" style="width: 4em;" :style="v.style" @click="headSortClick(k)"
            class="w3-hover-shadow w3-border">
            {{v.alias}}
        </th>
    </tr>
</thead>
`,
}
