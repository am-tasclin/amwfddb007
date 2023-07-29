'use strict'
import EdAdnData from '/f/6/libTGridDpp/EdAdnData.js'
import { mcd, unshiftParentChild } from '/f/6/lib/MetaContentData.js'
import {
    meMap, addMeMap, setOpenedDropDownId, getOpenedDropDownId,
    dppInteractivityPpId, closeEdAdnDialog,
} from '/f/6/libTGridDpp/dppInteractivity.js'
import { adnPpIdMedasPpl2Key, mElementKey } from '/f/6/libTGridDpp/MElement.js'
import { wsInsertAdnChild, wsUpdateR1, wsDeleteAdn1, wsSave1ParentSort } from '/f/6/lib/wsDbRw.js'
import { setMessagePollCopyId, getMessagePollCopyId } from '/f/6/lib/DbMessagePool.js'

const dbSendChildSort = parentChild => wsSave1ParentSort({
    insertList: parentChild.filter(i => !mcd.eMap[i].sort)
        .reduce((l, i) => l.push(i) && l, []),
    l: parentChild,
    adnId: mcd.eMap[parentChild[0]].p,
}).then(json => {
    mcd.parentChild[json.adnId] = json.l
    json.insertList.forEach(i => mcd.eMap[i].sort = json.l.indexOf(i) + 1)
    setOpenedDropDownId('finitaLaCommedia')
    json.l.forEach(i => Okeys(meMap[i]).filter(k => k.includes('mElement'))
        .forEach(k => meMap[json.adnId][k].count++))
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
                setOpenedDropDownId('finitaLaCommedia')
            })())
        }, insertAdnChild() {
            const x = wsInsertAdnChild({ parent: this.adnId }).then(json => json.d && (() => {
                mcd.eMap[json.d.doc_id] = { doc_id: json.d.doc_id, p: json.d.parent }
                // mcd.parentChild[this.adnId].push(json.d.doc_id)
                unshiftParentChild(this.adnId, json.d.doc_id)
                Okeys(meMap[this.adnId]).filter(k => k.includes('mElement'))
                    .forEach(k => meMap[this.adnId][k].count++)
            })())
            console.log(x)
        }, sortFirst() {
            const newParentChild = [this.adnId].concat(mcd.parentChild[mcd.eMap[this.adnId].p].filter(i => i != this.adnId))
            dbSendChildSort(newParentChild)
        }, sortEnd() {
            const newParentChild = mcd.parentChild[mcd.eMap[this.adnId].p].filter(i => i != this.adnId).concat([this.adnId])
            console.log(this.adnId, newParentChild)
            dbSendChildSort(newParentChild)
        },
        adn() { return mcd.eMap[this.adnId] || {} },
        setR() {
            console.log(getMessagePollCopyId(), this.adnId)
            wsUpdateR1({ adnId: this.adnId, r: getMessagePollCopyId() }).then(json => {
                console.log(json)
            })
        }, setCut() {
            console.log(123)
        }, copyR2() {
            console.log(123)
            setMessagePollCopyId(this.adn().r2)
            console.log(123, dbMessagePool)
        }, copyR() {
            console.log(123, this.adn())
            setMessagePollCopyId(this.adn().r)
            console.log(123, dbMessagePool)

        }, copyId() {
            setMessagePollCopyId(this.adnId)
            console.log(123, dbMessagePool)
        }, pasteAdnSibling() {
            console.log(123)
        }, sortUp() {
            const newParentChild = mcd.parentChild[mcd.eMap[this.adnId].p]
            this.adnId == newParentChild[0] && this.sortEnd() || (() => {
                const indexOf = newParentChild.indexOf(this.adnId)
                newParentChild.splice(indexOf, 1)
                newParentChild.splice(indexOf - 1, 0, this.adnId)
                dbSendChildSort(newParentChild)
            })()
        }, sortDown() {
            const newParentChild = mcd.parentChild[mcd.eMap[this.adnId].p]
            this.adnId == newParentChild[newParentChild.length - 1] && this.sortFirst() || (() => {
                const indexOf = newParentChild.indexOf(this.adnId)
                newParentChild.splice(indexOf, 1)
                newParentChild.splice(indexOf + 1, 0, this.adnId)
                dbSendChildSort(newParentChild)
            })()
        }, setAdnDialogWindow(editType) {
            console.log(this.adnId, editType, getOpenedDropDownId())
            'confDppEd_' == getOpenedDropDownId() &&
                dppInteractivityPpId(this.ppIdMedasPpl2Key.split('_')[1])['confDppEd'].count++
            getOpenedDropDownId() && getOpenedDropDownId().includes('edAdn_') &&
                closeEdAdnDialog(getOpenedDropDownId().split('_')[2])

            setOpenedDropDownId(editType + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key))
            console.log(getOpenedDropDownId())

            editType.includes('_fly') && this.count++
            editType.includes('_fix') && meMap[this.adnId][mElementKey(this.ppIdMedasPpl2Key)].count++
        }, isFlyAdnDialogWindow() {
            return ('edAdn_fly' + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key)) == getOpenedDropDownId()
        },
    }, template: `
<div class="w3-dropdown-content w3-border w3-hover-shadow" 
    style="width:20em;">
    <button class="w3-btn" @click="sortUp">⬆</button>
    <button class="w3-btn" @click="sortDown">⬇</button>
    <button class="w3-btn w3-border-left" @click="sortFirst" title="toFirst">⮸</button>
    <button class="w3-btn" @click="sortEnd" style="transform: rotate(180deg);"
        title="toEnd">⮸</button>
    <div class="w3-border-top">
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fix')">✐</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fly')">✎</button>
        <span class="w3-border-left">&nbsp;</span>
        <button class="w3-btn am-b" @click="insertAdnChild" title="addChild - додати дитину">＋</button>
        <button class="w3-btn am-b" @click="deleteAdn">－</button>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
            <EdAdnData :adnId="adnId" :ppIdMedasPpl2Key="ppIdMedasPpl2Key"/>
        </div>
    </div>
    <div class="w3-border-top w3-row">
    <div class="w3-col" style="width:3em">
        <button class="w3-btn am-b" @click="copyId()" title="copy - копіювати">⧉</button>
        <button class="w3-btn am-b" @click="setCut()" title="cut - вирізати">✀</button>
        <button class="w3-btn am-b" @click="pasteAdnSibling()" title="paste sibling - вставити як побратима">⧠</button>
    </div>
    <div class="w3-rest w3-border-left ">
        &nbsp;𝑟¹
        <button @click="copyR()" class="w3-btn w3-padding-small " title="copy R1">⧉</button>
        <button @click="setR()" class="w3-btn w3-padding-small " title="set R1">⧠</button>
        <span class="w3-tiny am-i">{{adn().r}} ::{{adn().r_vl_str}}</span>
        <div>&nbsp;𝑟²
            <button @click="copyR2()" class="w3-btn w3-padding-small " title="copy R2">⧉</button>
            <button @click="setR2()" class="w3-btn w3-padding-small " title="set R2">⧠</button>
            <span class="w3-tiny">{{adn().r2}} :{{adn().r2_vl_str}}</span>
        </div>
        &nbsp;
        <button class="w3-btn am-b" @click="pasteChild()" title="paste inner - вставити як внутрішній">+₊⧠</button>
        <div>&nbsp;</div>
    </div>
<div> <span class="w3-hide">{{count}}</span>
`,
}
const Okeys = Object.keys
