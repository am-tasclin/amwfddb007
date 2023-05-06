'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'
import AdnEnterData from '/f/3/lib/AdnEnterData.js'

pd.getAdnDialogWindow = () => pd.adnDialogWindow || (pd.adnDialogWindow = {})

fipiFn.reviewAdnMenu = (ppId, pp) => {
    const fipPP = fipi.ppId[ppId].pp[pp]
    Object.keys(fipPP.fipId).find(fipId => Object.keys(fipPP.fipId[fipId].adnMenu)
        .find(adnId => { fipPP.fipId[fipId].adnMenu[adnId].count++ }))
    fipPP.ppl2 &&
        Object.keys(fipPP.ppl2.fipId).find(fipId => Object.keys(fipPP.ppl2.fipId[fipId].adnMenu)
            .find(adnId => { fipPP.ppl2.fipId[fipId].adnMenu[adnId].count++ }))
}

export default {
    props: { adnId: Number, ppId: Number, pp: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    components: { AdnEnterData },
    mounted() {
        const fhirPartPath = fipiFn.fhirPP(this.ppId, this.pp, this.fipId, this.lrPl2)
        !fhirPartPath.adnMenu && (fhirPartPath.adnMenu = {})
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
            pd.adnDialogWindow.editType == editType
                && pd.adnDialogWindow.adnId == this.adnId
                && delete pd.adnDialogWindow.editType
                || (pd.adnDialogWindow.editType = editType)
            pd.adnDialogWindow.adnId = this.adnId
            fipiFn.reviewAdnMenu(this.ppId, this.pp)

            console.log(pd.adnDialogWindow)

        }, adnClick() {
            console.log(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
            fipiFn.onOffChild(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
        }
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
                <AdnEnterData :adnId="adnId"/>
            </div>
        </div>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setCopy()" title="copy - копіювати">⧉</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('cut')" title="cut - вирізати">✀</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
            <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isPaste()" >
                <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
                <div>
                    <button @click="setAdnDialogWindow('paste')" class="w3-btn w3-small" 
                        title="reference">type-1 r&nbsp; ⮫</button>
                        __
                </div> <div>
                    <button @click="setAdnDialogWindow('paste')" class="w3-btn w3-small" 
                        title="reference2">type-2 r2 ⮫</button>
                        __
                </div>
                <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste inner - вставити внутрішній">+₊⧠</button>
            </div>
        </div>
        Hi Menu | {{adnId}}
    </div> 
</span>&nbsp;
<span class="w3-small w3-text-blue" v-if="isFixedAdnDialogWindow()">✎</span>
<div class="w3-card-4 w3-leftbar am-width-100pr" v-if="isFixedAdnDialogWindow()" >
    <AdnEnterData :adnId="adnId"/>
</div> <span class="w3-hide"> {{count}} </span>
<span class="w3-small w3-text-blue" v-if="thisAdnDialogWindow()">✎</span>
<span class="w3-small w3-text-blue" v-if="isCopy()">⧉</span>
`
}