'use strict'
import { getHead, getBody, getBodyColumns } from './libGridTable.js'
import moment from '/webjars/moment/2.29.4/dist/moment.js'

export default {
    mounted() {
        console.log(moment('12.01.2023', 'DD.MM.YYYY').format('YYYY MMM DD'))
        console.log(getHead()['dataX'], 1)
    }, methods: {
        headConf(c) { return getHead()[c] || {} },
        dataFormat(v, c) {
            return moment(v, getHead()[c].dataInFormat).format(getHead()[c].dataOutFormat)
        },
        emptyList(size){return Array.apply(null, {length: size}).map((_,i)=>i)},
        keys() { return getBodyColumns() },
        body() { return getBody() },
    }, template: `
<tbody>
    <tr v-for="r in body()" class="w3-hover-shadow" >
        <td v-for="c in keys()" class="w3-border-left">
            <template v-if="headConf(c).dataOutFormat">
                {{dataFormat(r[c], c)}}
            </template>
            <template v-else>
                {{r[c]}}
            </template>
        </td>
    </tr>
    <tr v-for="i in emptyList(33)" >
        <td>{{i}}</td>
        <td class="w3-border">text --{{i}}</td>
    </tr>
</tbody>
`,
}