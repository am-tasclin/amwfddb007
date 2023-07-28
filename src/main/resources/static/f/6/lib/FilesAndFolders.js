'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd, setToEMap, adnFromMap } from '/f/6/lib/MetaContentData.js'
import { addDppItyComponent, setOpenedDropDownId, getOpenedDropDownId }
    from '/f/6/libTGridDpp/dppInteractivity.js'
import { wsInsertAdnString } from '/f/6/lib/wsDbRw.js'

const h1 = 376600

export default {
    data() { return { count: 0, newDocName: '', checkedFolderId: 0 } },
    mounted() {
        addDppItyComponent('faf', this)
    }, methods: {
        fafList() { return mcd.fafList },
        folderIdList() { return mcd.folderIdList },
        fafHeadView() { return ['doc_id', 'vl_str'] },
        fileList() { return mcd.fileList },
        adn(adnId) { return adnFromMap(adnId) },
        clickDoc(adnId) {
            console.log(adnId, this.adn(adnId))
        },
        setFolderId(folderId) { this.checkedFolderId = folderId },
        isFirstInFolder(adnId, i) { return adnFromMap(adnId).p != adnFromMap(mcd.fileList[i - 1]).p },
        openDpDn() { return getOpenedDropDownId() },
        onOffNewDoc() {
            setOpenedDropDownId('faf_new')
            !this.checkedFolderId && (this.checkedFolderId = mcd.folderIdList[0])
            console.log(getOpenedDropDownId(), this.checkedFolderId, mcd.folderIdList)
            this.count++
        },
        sendNewDoc() {
            console.log(this.newDocName, this.checkedFolderId)
            wsInsertAdnString({
                parent: this.checkedFolderId, r: h1, string: this.newDocName
            }).then(json => {
                console.log(json)
                console.log(mcd.fileList)
                console.log(adnFromMap(mcd.fileList[0]))
                const newFile = json.d
                newFile.vl_str = json.string
                console.log(newFile)
                setToEMap(newFile)
                mcd.fileList.unshift(newFile.doc_id)
                this.count++
            })
        }
    }, template: `&nbsp;
<div class="w3-center">
</div>

<table style="margin-left: auto;margin-right: auto;" :review="count">
    <caption class="w3-left-align">
        <input class="w3-border" />
        <button class="w3-btn w3-padding-small w3-ripple">🔍</button>&nbsp;
        <span class="w3-small w3-right"> new doc/site - новий документ/сторінка 
            <button @click="onOffNewDoc" class="w3-border">&nbsp;🗎&nbsp;</button>
        </span>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar w3-container" 
        :class="{'w3-show':'faf_new'==openDpDn(), 'w3-hide':'faf_new'!=openDpDn()}" >
            <button @click="onOffNewDoc" class="w3-btn w3-right w3-padding-small w13-opacity"> ✖ </button>
            <div> 📁 </div>
            <div @click="setFolderId(folderId)" class="w3-small w3-hover-shadow" v-for="folderId in folderIdList()"
            :class="{'w3-green':checkedFolderId==folderId}"
            >
                <span class="w3-tiny"> {{folderId}} <span>
                {{adn(folderId).vl_str}}
            </div>

            <div class="w3-tiny w3-border-top"> Name new document/page </div>
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
                <span class="w3-right" v-if="ch=='vl_str' && checkedFolderId">
                    {{checkedFolderId}}
                </span>
            </th>
        </tr>
    </thead>
    <tbody>
        <template v-for="(adnId, i) in fileList()" >
        <tr v-if="isFirstInFolder(adnId, i)">
            <td @click="setFolderId(adn(adnId).p)" class="w3-hover-shadow" colspan=2 style="padding-top: 1em;"
            :class="{'w3-border-green w3-border':checkedFolderId==adn(adnId).p}"
            >
            {{checkedFolderId==adn(adnId).p}}
                <span class="w3-tiny am-i"> {{adn(adn(adnId).p).vl_str}}</span>
                <span class="w3-tiny w3-right">📁&nbsp;{{adn(adnId).p}}</span>
            </td>
        </tr>
        <tr @click="clickDoc(adnId)" class="w3-hover-shadow">
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
