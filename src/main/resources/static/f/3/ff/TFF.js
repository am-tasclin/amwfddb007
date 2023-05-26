'use strict'
import { dbMpData, dbMpView } from '/f/3/lib/wsDbRw.js'

export default {
    data() { return { count: 0 } },
    mounted() {
        dbMpView.ff = this
        console.log(dbMpView)
    },
    methods: {
        ffl() { return dbMpData.list },
        ffh() { return dbMpData.list && Object.keys(dbMpData.list[0]) },
    },
    template: `
    <div class="w3-center">
        <input class="w3-border"/>
        <button class="w3-btn w3-padding-small w3-ripple">🔍</button>
    </div>

<table>
    <thead>
        <tr class="w3-tiny am-b">
            <th class="w3-light-gray" v-for="ch in ffh()">
                {{ch}}
            </th>
        </tr>
    </thead>
    <tbody>
        <template v-for="(r, i) in ffl()" >
        <tr>
            <td colspan=2 v-if="i==0 || ffl()[i-1].parent!=r.parent">
                {{r.parent}}
            </td>
        </tr>
        <tr class="w3-hover-shadow">
            <td class="w3-small">
                <a :href="'/f/3/twiki/i.html#page,'+r.string_id">{{r.string_id}}</a>
            </td>
            <td>{{r.value_22}}</td>
            <td>{{i>0 && ffl()[i-1].parent==r.parent}}</td>
            <td>{{r.parent}}</td>
        </tr>
        </template>
    </tbody>
</table><snap class="w3-hide">{{count}}</snap>
<p> &nbsp; </p>
`,
}