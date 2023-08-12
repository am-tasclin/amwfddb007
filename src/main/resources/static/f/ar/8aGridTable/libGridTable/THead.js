'use strict'
// import ddPersonal from '../ddPersonal.js'
import { headKeysWithChild, gridTable, TBodyFn, getHeadKeyObject } from
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'

const Okeys = Object.keys



export default {
    data() {
        return {
            count: 0,

        }
    },
    props: { tagName: String },
    mounted() {
        gridTable(this.tagName).tHead = this
    },

    methods: {
        head() {
            return gridTable(this.tagName).headA
        },

        keys() {
            return gridTable(this.tagName).bodyColumnsA
        },

        colums() {
            return gridTable(this.tagName).getColumns()
        },

        headKeysWithChild() {
            return headKeysWithChild(gridTable(this.tagName).headA)
        },

        h11eadKeysWithChild() {
            return gridTable(this.tagName).headA
                &&
                headKeysWithChild(gridTable(this.tagName).headA) || []
        },

        headSortClick(k) { console.log(' sss ', gridTable(this.tagName).headA[k].filter) },

        headSortClick2(k1, k) {
            console.log(k1,gridTable(this.tagName).headA[k1].filter) 
            console.log(k1, k, getHead()[k1].child[k])
        },

        childCount(o) { return !o && 1 || Okeys(o).length }
    },
    template: `
 


<thead v-if="headKeysWithChild().length >0 " class="w3-small">
    <tr>
        <th v-for="(v,k) in head()" 
        :class="v.classHead" 
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
            :class="v.classHead"
            :style="v.style" 
            @click="headSortClick2(k1,k)">
            {{v.alias}}
        </th>
    </template>
</tr>


    <!--tr>
       <th v-for="v in colums()" 
           class="w3-hover-shadow w3-border w3-red" >
             <input class="am-width-100pr"
             v-model="message"  />
       </th>
   </tr-->

</thead>
<thead v-else class="w3-small">
    <tr>
        <th v-for="(v,k) in head()" 
            style="width: 4em;" 
            :style="v.style" 
            @click="headSortClick(k)"
            class="w3-red w3-hover-shadow w3-border">
               {{v.alias}}
        </th>
    </tr>
</thead>
  
`,
}
