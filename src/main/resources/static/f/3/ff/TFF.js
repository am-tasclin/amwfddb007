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
    ff2
<table>
    <thead>
        <tr class="w3-tiny am-b">
            <th class="w3-light-gray" v-for="ch in ffh()">
                {{ch}}
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="r in ffl()" class="w3-hover-shadow">
            <td class="w3-small">
                <a :href="'/f/3/twiki/i.html#page,'+r.string_id">{{r.string_id}}</a>
            </td>
            <td>{{r.value_22}}</td>
        </tr>
    </tbody>
</table><snap class="w3-hide">{{count}}</snap>
<p> &nbsp; </p>
`,
}