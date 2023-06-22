'use strict'
import {
    fileFolder,
    setFfInteractivityComponent, Okeys
} from '/f/5/lib/wsDbRw.js'

export default {
    data() { return { count: 0 } },
    methods: {
        ffh() { return fileFolder.list && Okeys(fileFolder.list[0]) },
        ffl() { return fileFolder.list },
    }, mounted() {
        setFfInteractivityComponent('ff', this)
    }, template: `
Hi FF!
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
            <tr class="w3-hover-shadow">
                <td class="w3-small">
                    <a :href="'/f/5/twiki/i.html#page,'+r.string_id">{{r.string_id}}</a>
                </td>
                <td>{{r.vl_str}}</td>
            </tr>
        </template>
    </tbody>
</table> <snap class="w3-hide">{{count}}</snap>
`,
}