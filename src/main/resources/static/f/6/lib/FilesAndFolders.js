'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd, adnFromMap } from '/f/6/lib/MetaContentData.js'
import { addDppItyComponent, setOpenedDropDownId, getOpenedDropDownId }
    from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    data() { return { count: 0, newDocName:''} },
    mounted() {
        addDppItyComponent('faf', this)
    }, methods: {
        fafList() { return mcd.fafList },
        fafHeadView() { return ['doc_id', 'vl_str'] },
        fileList() { return mcd.fileList },
        adn(adnId) { return adnFromMap(adnId) },
        isFirstInFolder(adnId, i) {
            return adnFromMap(adnId).p != adnFromMap(mcd.fileList[i - 1]).p
        },
        openDpDn() { return getOpenedDropDownId() },
        newDoc() {
            setOpenedDropDownId('faf_new')
            console.log(getOpenedDropDownId())
            this.count++
        },
        sendNewDoc(){
            console.log(this.newDocName)
        }
    }, template: `&nbsp;
<div class="w3-center">
</div>

<table style="margin-left: auto;margin-right: auto;" :review="count">
    <caption class="w3-left-align">
        <input class="w3-border" />
        <button class="w3-btn w3-padding-small w3-ripple">🔍</button>&nbsp;
        <span class="w3-small w3-right"> new doc/site - новий документ/сторінка 
            <button @click="newDoc" class="w3-border">&nbsp;🗎&nbsp;</button>
        </span>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar w3-container" 
        :class="{'w3-show':'faf_new'==openDpDn(), 'w3-hide':'faf_new'!=openDpDn()}" >
            <button @click="newDoc" class="w3-btn w3-right w3-padding-small w13-opacity"> ✖ </button>
            <div class="w3-tiny"> Name new document/page </div>
            <div> Назва нового документу/сторінки </div>
            <input v-model="newDocName" class="w3-border" />
            <div>
                <button @click="sendNewDoc" class="w3-border w3-small" > send DB / відправити БД </button>
            </div>
        </div>
    </caption>

    <thead>
        <tr class="w3-tiny am-b">
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

<div class="w3-tiny w3-opacity w3-hide">
    {{fafList()}}
<div> 
`,
}
