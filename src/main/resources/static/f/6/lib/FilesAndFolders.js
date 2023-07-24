'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd, adnFromMap } from '/f/6/lib/MetaContentData.js'
import { addDppItyComponent, }
    from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    data() { return { count: 0, } },
    mounted() {
        addDppItyComponent('faf', this)
    }, methods: {
        fafList() { return mcd.fafList },
        fafHeadView() { return ['doc_id', 'vl_str'] },
        fileList() { return mcd.fileList },
        adn(adnId) { return adnFromMap(adnId) },
        isFirstInFolder(adnId, i) {
            return adnFromMap(adnId).p != adnFromMap(mcd.fileList[i - 1]).p
        }
    }, template: `&nbsp;
<div class="w3-center">
    <input class="w3-border"/>
    <button class="w3-btn w3-padding-small w3-ripple">🔍</button>
</div>

<table style="margin-left: auto;margin-right: auto;">
    <thead >
        <tr class="w3-tiny am-b ">
            <th class="w3-light-gray w3-border-bottom" v-for="ch in fafHeadView()">
                {{ch}}
            </th>
        </tr>
    </thead>
    <tbody>
        <template v-for="(adnId, i) in fileList()" >
        <tr v-if="isFirstInFolder(adnId, i)">
            <td colspan=2 style="padding-top: 1em;">
                <span class="w3-tiny am-i"> {{adn(adn(adnId).p).vl_str}}</span>
                <span class="w3-tiny w3-right">📁&nbsp;{{adn(adnId).p}}</span>
            </td>
        </tr>
        <tr class="w3-hover-shadow">
            <td class="w3-small">
                <a :href="'/f/6/twiki/i.html#page,'+adn(adnId).doc_id">{{adn(adnId).doc_id}}</a>
            </td>
            <td>{{adn(adnId).vl_str}}</td>
        </tr>
        </template>
        <tr><td colspan="2" class="w3-border-bottom"></td></tr>
    </tbody>
</table>
<span class="w3-hide">{{count}}</span>

<div class="w3-tiny w3-opacity w3-hide">
    {{fafList()}}
<div> 
`,
}
