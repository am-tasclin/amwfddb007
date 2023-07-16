'use strict'
import EdAdnData from '/f/6/libTGridDpp/EdAdnData.js'
import { mcd } from '/f/6/lib/MetaContentData.js'
import {
    meMap, addMeMap, setOpenedDropDownId, getOpenedDropDownId,
    dppInteractivityPpId, closeEdAdnDialog,
} from '/f/6/libTGridDpp/dppInteractivity.js'
import { adnPpIdMedasPpl2Key, mElementKey } from '/f/6/libTGridDpp/MElement.js'
import { wsInsertAdnChild, wsDeleteAdn1, wsSave1ParentSort } from '/f/6/lib/wsDbRw.js'

const dbSendChildSort = parentChild => wsSave1ParentSort({
    insertList: parentChild.filter(i => !mcd.eMap[i].sort)
        .reduce((l, i) => l.push(i) && l, []),
    l: parentChild,
    adnId: mcd.eMap[parentChild[0]].p,
}).then(json => {
    mcd.parentChild[json.adnId] = json.l
    json.insertList.forEach(i => mcd.eMap[i].sort = json.l.indexOf(i) + 1)
    Okeys(meMap[json.adnId]).filter(k => k.includes('mElement'))
        .forEach(k => meMap[json.adnId][k].count++)
})


export default {
    props: { adnId: Number, ppIdMedasPpl2Key: String, }, data() { return { count: 0, } },
    components: { EdAdnData },
    mounted() {
        addMeMap(this.adnId, 'adnMenu' + this.ppIdMedasPpl2Key, this)
    }, methods: {
        deleteAdn() {
            wsDeleteAdn1({ adnId: this.adnId }).then(json => json.deleted && (() => {
                const p = mcd.eMap[this.adnId].p
                delete meMap[this.adnId]
                mcd.parentChild[p].splice(mcd.parentChild[p].indexOf(this.adnId), 1)
                Okeys(meMap[p]).filter(k => k.includes('mElement'))
                    .forEach(k => meMap[p][k].count++)
            })())
        }, insertAdnChild() {
            wsInsertAdnChild({ parent: this.adnId }).then(json => json.d && (() => {
                mcd.eMap[json.d.doc_id] = { doc_id: json.d.doc_id, p: json.d.parent }
                mcd.parentChild[this.adnId].push(json.d.doc_id)
                Okeys(meMap[this.adnId]).filter(k => k.includes('mElement'))
                    .forEach(k => meMap[this.adnId][k].count++)
            })())
        }, sortFirst() {
            const parentChild = [this.adnId].concat(
                mcd.parentChild[mcd.eMap[this.adnId].p].filter(i => i != this.adnId))
            dbSendChildSort(parentChild)
        }, sortEnd() {
            console.log(this.adnId)
        }, sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        }, sortDown() {
            console.log('123', this.ppIdMedasPpl2Key)
        }, setAdnDialogWindow(editType) {
            'confDppEd_' == getOpenedDropDownId() &&
                dppInteractivityPpId(this.ppIdMedasPpl2Key.split('_')[1])['confDppEd'].count++
            getOpenedDropDownId() && getOpenedDropDownId().includes('edAdn_') &&
                closeEdAdnDialog(getOpenedDropDownId().split('_')[2])

            setOpenedDropDownId(editType + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key))

            // editType.includes('_fly') && 
            this.count++
            editType.includes('_fix') && meMap[this.adnId][mElementKey(this.ppIdMedasPpl2Key)].count++
        }, isFlyAdnDialogWindow() {
            return ('edAdn_fly' + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key)) == getOpenedDropDownId()
        },
    }, template: `
<div class="w3-dropdown-content w3-border w3-hover-shadow" 
    style="width:18em;">
    <button class="w3-btn" @click="sortUp">⬆</button>
    <button class="w3-btn" @click="sortDown">⬇</button>
    <button class="w3-btn" @click="sortFirst" title="toFirst">⮸</button>
    <button class="w3-btn" @click="sortEnd" style="transform: rotate(180deg);"
        title="toEnd">⮸</button>
    <div class="w3-border-top">
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fix')">✐</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fly')">✎</button>
        ｜
        <button class="w3-btn am-b" @click="insertAdnChild" title="addChild - додати дитину">＋</button>
        <button class="w3-btn am-b" @click="deleteAdn">－</button>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
            <EdAdnData :adnId="adnId" :ppIdMedasPpl2Key="ppIdMedasPpl2Key"/>
        </div>
    </div>
<div> <span class="w3-hide">{{count}}</span>
`,
}
const Okeys = Object.keys
