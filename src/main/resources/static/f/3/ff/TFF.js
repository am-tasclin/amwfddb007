'use strict'
import { dbMpData, dbMpView } from '/f/3/lib/wsDbRw.js'

export default {
    data() { return { count: 0 } },
    mounted() {
        dbMpView.ff = this
        console.log(dbMpView)
        console.log(this.ffh())
    },
    methods: {
        eMap(adnId, ne) { return dbMpData.eMap && dbMpData.eMap[adnId] && dbMpData.eMap[adnId][ne] },
        ffl() { return dbMpData.list },
        ffh() { return dbMpData.list && Object.keys(dbMpData.list[0]) },
    },
    template: `&nbsp;
<div class="w3-center">
    <input class="w3-border"/>
    <button class="w3-btn w3-padding-small w3-ripple">🔍</button>
</div>
{{ffh()}}
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
        <tr v-if="i==0 || ffl()[i-1].parent!=r.parent">
            <td :colspan="ffh().length" style="padding-top: 1em;">
            <span class="w3-tiny am-i"> {{eMap(r.parent, 'value')}}</span>
            <span class="w3-tiny w3-right">📁&nbsp;{{r.parent}}</span>
            </td>
        </tr>
        <tr class="w3-hover-shadow">
            <td class="w3-small">
                <a :href="'/f/3/twiki/i.html#page,'+r.string_id">{{r.string_id}}</a>
            </td>
            <td>{{r.value_22}}</td>
        </tr>
        </template>
    </tbody>
</table><snap class="w3-hide">{{count}}</snap>
<p> &nbsp; </p>
`,
}