'use strict'
// import ddPersonal from '../ddPersonal.js'
import { getBodyColumns, getHead, headKeysWithChild} from './libGridTable.js'
const Okeys = Object.keys

export default {
    methods: {
        head() { return getHead() },
        pol() { return getBodyColumns() },


        headKeysWithChild() { return headKeysWithChild(getHead()) },
        h11eadKeysWithChild() { return getHead() && headKeysWithChild(getHead()) || [] },

        headSortClick(k) {
          
        },


        headSortClick2(k1, k) {
            console.log(k1, getHead()[k1])
            console.log(k1, k, getHead()[k1].child[k])
        },
        childCount(o) { return !o && 1 || Okeys(o).length }
    },
    template: `
<thead v-if="headKeysWithChild().length" class="w3-small">
    <tr>
        <th v-for="(v,k) in head()" 
        :class="v.classpole" 
		@click="headSortClick(k)" 
        :style="v.style" 
        :colspan="childCount(v.child)"
        :rowspan="headKeysWithChild().includes(k)&&1||2">
            {{v.alias}}
        </th>
    </tr>
    <tr>
        <template v-for="k1 in headKeysWithChild()">
            <th v-for="(v,k) in head()[k1].child" 
            class="w3-yellow w3-center"
            :style="v.style" 
            @click="headSortClick2(k1,k)">
                {{v.alias}}
            </th>
        </template>
    </tr>
</thead>
<thead v-else class="w3-small">
    <tr>
        <th v-for="(v,k) in head()" 
        style="width: 4em;" 
        :style="v.style" 
        @click="headSortClick(k)"
        class="w3-hover-shadow w3-border">
            {{v.alias}}
        </th>
    </tr>
</thead>
 
    <tr>
        <th v-for="(v) in pol()" 
            class="w3-hover-shadow w3-border w3-red">
           {{v}}
        </th>
    </tr>

`,
}
