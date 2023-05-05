'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

export default {
    props: { adnId: Number, ppId: Number, pp: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    mounted() {
        const fhirPartPath = fipiFn.fhirPP(this.ppId, this.pp, this.fipId, this.lrPl2)
        !fhirPartPath.fhirPart && (fhirPartPath.adnMenu = {})
        fhirPartPath.adnMenu[this.adnId] = this
    }, methods: {
        sortUp() {
            console.log(123)
        }, sortDown() {
            console.log(123)
        }, sortPlus() {
            console.log(123)
        }, sortMinus() {
            console.log(123)
        }, thisAdnDialogWindow() {
            return pd.adnDialogWindow
                && pd.adnDialogWindow.adnId == this.adnId
        }, isCopy() {
            return pd.adnDialogWindow
                && pd.adnDialogWindow.adnIdCopy == this.adnId
        }, isPaste() {
            return pd.adnDialogWindow && pd.adnDialogWindow.type == 'paste'
                && (pd.adnDialogWindow.adnIdPaste == this.adnId)
        }, isAdnDialogWindow(type) {
            return this.thisAdnDialogWindow()
                && pd.adnDialogWindow.type == type
        }, setAdnDialogWindow(type, editType) {
            !pd.adnDialogWindow && (pd.adnDialogWindow = {})
            pd.adnDialogWindow.editType == editType
                && delete pd.adnDialogWindow.editType
                || (pd.adnDialogWindow.editType = editType)

            pd.adnDialogWindow.type == type
                && delete pd.adnDialogWindow.type
                || (() => {
                    pd.adnDialogWindow.type = type
                    pd.adnDialogWindow.ppId = this.ppId
                    pd.adnDialogWindow.pp = this.pp
                    pd.adnDialogWindow.fipId = this.fipId
                    pd.adnDialogWindow.lrPl2 = this.lrPl2
                })()

            pd.adnDialogWindow.type == 'copy'
                && (pd.adnDialogWindow.adnIdCopy = this.adnId)
            pd.adnDialogWindow.type == 'paste'
                && (pd.adnDialogWindow.adnIdPaste = this.adnId)
            pd.adnDialogWindow.adnId = this.adnId

            const fipPP = fipi.ppId[this.ppId].pp[this.pp]
            Object.keys(fipPP.fipId).find(fipId => Object.keys(fipPP.fipId[fipId].adnMenu)
                .find(adnId => { fipPP.fipId[fipId].adnMenu[adnId].count++ }))

            console.log(pd.adnDialogWindow)
        },
    }, template: `
<div class="w3-dropdown-content w3-border w3-hover-shadow" style="width:16em;">
    <button class="w3-btn" @click="sortUp()">⬆</button>
    <button class="w3-btn" @click="sortDown()">⬇</button>
    ｜
    <button class="w3-btn am-b" @click="sortPlus()">＋</button>
    <button class="w3-btn am-b" @click="sortMinus()">－</button>
    <div class="w3-border-top">
        <button class="w3-btn am-b w3-text-blue" @click="sortMinus()">✎</button>
        ｜
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fly')">✐</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fixed')">✎</button>
    </div>
    <div class="w3-border-top">
        <button class="w3-btn am-b" @click="setAdnDialogWindow('copy')" title="copy - копіювати">⧉</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('cut')" title="cut - вирізати">✀</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar"
        v-if="isPaste()" >
        a22
        </div>
    </div>
    {{isPaste()}}
    Hi Menu  |
    {{adnId}}
    a1
</div> <span class="w3-hide"> {{count}} </span>
<span class="w3-small w3-text-blue" v-if="thisAdnDialogWindow()">✎</span>
<span class="w3-small w3-text-blue" v-if="isCopy()">⧉</span>
`
}