'use strict'
import EdAdnData from '/f/6/libTGridDpp/EdAdnData.js'
import { mcd, pushParentChild } from '/f/6/lib/MetaContentData.js'
import {
    meMap, addMeMap, setOpenedDropDownId, getOpenedDropDownId,
    dppInteractivityPpId, closeEdAdnDialog,
} from '/f/6/libTGridDpp/dppInteractivity.js'
import { adnPpIdMedasPpl2Key, mElementKey } from '/f/6/libTGridDpp/MElement.js'
import { wsInsertAdnChild, wsUpdateR1, wsUpdateR2, wsDeleteAdn1, wsSave1ParentSort } from '/f/6/lib/wsDbRw.js'
import { setMessagePollCopyId, getMessagePollCopyId, getMessagePollCopyIdOwner } from
    '/f/6/lib/DbMessagePool.js'

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
const dbSendInsertAdnChild = adnJson => wsInsertAdnChild(adnJson)
    .then(json => json.d && (() => {
        const newAdn = mcd.eMap[json.d.doc_id] = { doc_id: json.d.doc_id, p: json.d.parent, }
            , sourceAdn = mcd.eMap[json.sourceAdnId]
        json.d.r && (newAdn.r = json.d.r)
        json.d.r2 && (newAdn.r2 = json.d.r2)
        sourceAdn && sourceAdn.r_vl_str && (newAdn.r_vl_str = sourceAdn.r_vl_str)
        sourceAdn && sourceAdn.r2_vl_str && (newAdn.r2_vl_str = sourceAdn.r2_vl_str)
        pushParentChild(json.d.parent, json.d.doc_id)
        Okeys(meMap[json.d.parent]).forEach(k => meMap[json.d.parent][k].count++)
    })())

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
            wsUpdateR1({ adnId: this.adnId, r: getMessagePollCopyId() }).then(json => {
                this.adn().r = json.r
                this.adn().r_vl_str = mcd.eMap[getMessagePollCopyIdOwner()].r_vl_str
                console.log(this.adnId, meMap[this.adnId])
                Okeys(meMap[this.adnId]).forEach(k => {
                    console.log(k, meMap[this.adnId][k])
                    meMap[this.adnId][k].count++
                })
            })
        }, setR2() {
            console.log(getMessagePollCopyId(), this.adnId)
            wsUpdateR2({ adnId: this.adnId, r2: getMessagePollCopyId() }).then(json => {
                this.adn().r2 = json.r2
                this.adn().r2_vl_str = mcd.eMap[getMessagePollCopyIdOwner()].r2_vl_str
                Okeys(meMap[this.adnId]).forEach(k => meMap[this.adnId][k].count++)
            })
        }, copyR2() {
            setMessagePollCopyId(this.adn().r2, this.adnId)
            console.log(123, getMessagePollCopyId())
        }, copyR() {
            setMessagePollCopyId(this.adn().r, this.adnId)
            console.log(123, getMessagePollCopyId())
        }, delR1() {
            wsUpdateR1({ adnId: this.adnId, r: null }).then(json => {
                delete this.adn().r
                delete this.adn().r_vl_str
                Okeys(meMap[this.adnId]).forEach(k => meMap[this.adnId][k].count++)
            })
        }, delR2() {
            wsUpdateR1({ adnId: this.adnId, r2: null }).then(json => {
                delete this.adn().r2
                delete this.adn().r2_vl_str
                Okeys(meMap[this.adnId]).forEach(k => meMap[this.adnId][k].count++)
            })
        }, cutId() {
            console.log(123)
        }, copyId() {
            setMessagePollCopyId(this.adnId)
            console.log(123, getMessagePollCopyId())
        }, pasteAdnSibling() {
            const sourceAdn = mcd.eMap[getMessagePollCopyId()]
            dbSendInsertAdnChild({
                parent: this.adn().p, r: sourceAdn.r, r2: sourceAdn.r2
                , sourceAdnId: sourceAdn.doc_id
            })
        }, insertAdnChild() {
            dbSendInsertAdnChild({ parent: this.adnId })
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
    :reView="count" style="width:20em;">
    <button @click="sortUp" class="w3-btn">⬆</button>
    <button @click="sortDown" class="w3-btn">⬇</button>
    <button @click="sortFirst" class="w3-btn w3-border-left" title="toFirst">⮸</button>
    <button @click="sortEnd" class="w3-btn" style="transform: rotate(180deg);"
        title="toEnd">⮸</button>
    <div class="w3-border-top">
        <button @click="setAdnDialogWindow('edAdn_fix')" class="w3-btn am-b">✐</button>
        <button @click="setAdnDialogWindow('edAdn_fly')" class="w3-btn am-b">✎</button>
        <span class="w3-border-left">&nbsp;</span>
        <button @click="insertAdnChild" class="w3-btn am-b" title="addChild - додати дитину">＋</button>
        <button @click="deleteAdn" class="w3-btn am-b" >－</button>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
            <EdAdnData :adnId="adnId" :ppIdMedasPpl2Key="ppIdMedasPpl2Key"/>
        </div>
    </div>
    <div class="w3-border-top w3-row">
    <div class="w3-col" style="width:3em">
        <button @click="copyId" class="w3-btn am-b" title="copy - копіювати">⧉</button>
        <button @click="cutId" class="w3-btn am-b" title="cut - вирізати">✀</button>
        <button @click="pasteAdnSibling" class="w3-btn am-b" title="paste sibling - вставити як побратима">⧠</button>
    </div>
    <div class="w3-rest w3-border-left ">
        &nbsp;𝑟¹
        <span @click="delR1" class="w3-hover-shadow" v-if="adn().r">-</span>
        <button @click="copyR" class="w3-btn w3-padding-small " title="copy R1">⧉</button>
        <button @click="setR" class="w3-btn w3-padding-small " title="set R1">⧠</button>
        <span class="w3-tiny am-i">{{adn().r}} ::{{adn().r_vl_str}}</span>
        <div>&nbsp;𝑟²
            <span @click="delR2" class="w3-hover-shadow" v-if="adn().r2">-</span>
            <button @click="copyR2" class="w3-btn w3-padding-small" title="copy R2">⧉</button>
            <button @click="setR2" class="w3-btn w3-padding-small" title="set R2">⧠</button>
            <span class="w3-tiny">{{adn().r2}} :{{adn().r2_vl_str}}</span>
        </div>
        <div>&nbsp;</div>&nbsp;
        <span class="w3-hover-shadow w3-small">&nbsp;1&nbsp;</span>
        <span class="w3-hover-shadow w3-small w3-border-left">&nbsp;2&nbsp;</span>
        <span class="w3-right"> &nbsp; &nbsp; </span>
        <button @click="pasteChild" class="w3-btn am-b w3-right" title="paste inner - вставити як внутрішній">+₊⧠</button>
    </div>
<div>
`,
}
const Okeys = Object.keys
