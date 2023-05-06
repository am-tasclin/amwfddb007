'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

pd.getAdnDialogWindow = () => pd.adnDialogWindow || (pd.adnDialogWindow = {})

fipiFn.reviewAdnMenu = (ppId, pp) => {
    const fipPP = fipi.ppId[ppId].pp[pp]
    Object.keys(fipPP.fipId).find(fipId => Object.keys(fipPP.fipId[fipId].adnMenu)
        .find(adnId => { fipPP.fipId[fipId].adnMenu[adnId].count++ }))
}

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
        }, isPaste() {
            return pd.adnDialogWindow && pd.adnDialogWindow.type == 'paste'
                && (pd.adnDialogWindow.adnIdPaste == this.adnId)
        }, isAdnDialogWindow(type) {
            return this.thisAdnDialogWindow()
                && pd.adnDialogWindow.type == type
        }
        , thisAdnDialogWindow() { return pd.adnDialogWindow && pd.adnDialogWindow.adnId == this.adnId }
        , isCopy() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCopy == this.adnId }
        , setCopy() {
            pd.getAdnDialogWindow()
            pd.adnDialogWindow.adnIdCopy = this.adnId
            fipiFn.reviewAdnMenu(this.ppId, this.pp)
        }, isPaste() {
            return pd.adnDialogWindow
                && pd.adnDialogWindow.adnId == this.adnId
                && pd.adnDialogWindow.type == 'paste'
        }, isFlyAdnDialogWindow() {
            return pd.adnDialogWindow
                && pd.adnDialogWindow.adnId == this.adnId
                && pd.adnDialogWindow.type == 'edit'
                && pd.adnDialogWindow.editType == 'fly'
        }, isFixedAdnDialogWindow() {
            return pd.adnDialogWindow
                && pd.adnDialogWindow.adnId == this.adnId
                && pd.adnDialogWindow.type == 'edit'
                && pd.adnDialogWindow.editType == 'fixed'
        }, cleanEdit() {
            delete pd.adnDialogWindow
            fipiFn.reviewAdnMenu(this.ppId, this.pp)
        }, setAdnDialogWindow(type, editType) {
            pd.getAdnDialogWindow()
            pd.adnDialogWindow.type == 'paste' && type == 'paste'
                && delete pd.adnDialogWindow.type
                || (pd.adnDialogWindow.type = type)

            pd.adnDialogWindow.adnId = this.adnId
            pd.adnDialogWindow.editType == editType
                && delete pd.adnDialogWindow.editType
                || (pd.adnDialogWindow.editType = editType)
            fipiFn.reviewAdnMenu(this.ppId, this.pp)
        },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} </span>
    <div class="w3-dropdown-content w3-border w3-hover-shadow" style="width:16em;">
        <button class="w3-btn" @click="sortUp()">⬆</button>
        <button class="w3-btn" @click="sortDown()">⬇</button>
        ｜
        <button class="w3-btn am-b" @click="sortPlus()">＋</button>
        <button class="w3-btn am-b" @click="sortMinus()">－</button>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fixed')">✐</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fly')">✎</button>
            ｜
            <button class="w3-btn am-b w3-text-blue" @click="cleanEdit()">－✎⧉</button>
            <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
                a22
                <p>
                a33
                </p>
            </div>
        </div>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setCopy()" title="copy - копіювати">⧉</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('cut')" title="cut - вирізати">✀</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
            <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isPaste()" >
                a22
                <p>
                a33
                </p>
            </div>
        </div>
        Hi Menu  |
        {{adnId}}
    </div> 
</span>&nbsp;
<span class="w3-small w3-text-blue" v-if="thisAdnDialogWindow()">✎</span>
<span class="w3-small w3-text-blue" v-if="isCopy()">⧉</span>
<div class="w3-card-4 w3-leftbar" v-if="isFixedAdnDialogWindow()" style="width: 34em;" >
    a22
    <p>
    a33
    </p>
</div> <span class="w3-hide"> {{count}} </span>
`
}