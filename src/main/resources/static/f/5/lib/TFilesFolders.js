'use strict'
import { mcd } from '/f/5/lib/MetaContentData.js'
import {
    fileFolder,
    setFfInteractivityComponent, Okeys
} from '/f/5/lib/wsDbRw.js'

export default {
    data() { return { count: 0 } },
    methods: {
        ffh() { return fileFolder.list && Okeys(fileFolder.list[0]) },
        ffl() { return fileFolder.list },
        eMap(adnId, ne) { return mcd.eMap && mcd.eMap[adnId] && mcd.eMap[adnId][ne] },
    }, mounted() {
        setFfInteractivityComponent('ff', this)
    }, template: `&nbsp;
<div class="w3-center">
    <input class="w3-border"/>
    <button class="w3-btn w3-padding-small w3-ripple">🔍</button>
</div>

<table>
    <thead>
        <tr class="w3-tiny am-b">
            <th class="w3-light-gray" v-for="ch in ffh()">{{ch}}</th>
        </tr>
    </thead>
    <tbody>
        <template v-for="(r, i) in ffl()">
            <tr v-if="i==0 || ffl()[i-1].parent!=r.parent">
                <td :colspan="ffh().length" style="padding-top: 1em;" class="w3-tiny">
                    <span class="w3-tiny am-i"> {{eMap(r.parent, 'vl_str')}}</span>
                    <span class="w3-tiny w3-right">📁&nbsp;{{r.parent}}</span>
                </td>
            </tr>
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