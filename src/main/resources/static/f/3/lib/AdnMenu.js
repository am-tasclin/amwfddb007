'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'
import { dbMpView, dbMpFn } from '/f/3/lib/wsDbRw.js'
import AdnEnterData from '/f/3/lib/AdnEnterData.js'

pd.getAdnDialogWindow = () => pd.adnDialogWindow || (pd.adnDialogWindow = {})

fipiFn.reviewAdnMenu = (ppId, pp) => {
    const fipPP = fipi.ppId[ppId].pp[pp]
    Object.keys(fipPP.fipId).find(fipId => Object.keys(fipPP.fipId[fipId].adnMenu)
        .find(adnId => { fipPP.fipId[fipId].adnMenu[adnId].count++ }))
    fipPP.ppl2 &&
        Object.keys(fipPP.ppl2.fipId).find(fipId => Object.keys(fipPP.ppl2.fipId[fipId].adnMenu)
            .find(adnId => { fipPP.ppl2.fipId[fipId].adnMenu[adnId].count++ }))
    fipi.edCopyCut && fipi.edCopyCut.countFn('AdnMenu.reviewAdnMenu')
}

fipiFn.sortUpDown = (direction, adnId) => {
    const parent = pd.eMap[adnId].parent
        , l = pd.parentChild[parent]
        , position = l.indexOf(adnId)
    l.splice(position, 1)
    let rounded = false
    position == 0 && direction < 0 && l.push(adnId)
        && (rounded = true) //first to end
    position == l.length && direction > 0 && l.splice(0, 0, adnId)
        && (rounded = true) //last to first
    !rounded && l.splice(position + direction, 0, adnId)
    console.log(l)

    // !pd.dbSave && (pd.dbSave = {})
    // !pd.dbSave.sortParentChild && (pd.dbSave.sortParentChild = [])
    fipiFn.getDbSave('sortParentChild')
    // !pd.dbSave.sortParentChild.includes(parent) && (pd.dbSave.sortParentChild.push(parent))

    dbMpFn.addDbSaveList('sortParentChild', parent)

    // dbMpFn.getDbSaveList('sortParentChild') &&
    //     !dbMpFn.getDbSaveList('sortParentChild').includes(parent) &&
    //     dbMpFn.getDbSaveList('sortParentChild').push(parent)
    dbMpView.dbMessagePool && dbMpView.dbMessagePool.addCountCurrentPool()

    pd.getAdnDialogWindow().adnId = parent
    // fipi.edCopyCut && fipi.edCopyCut.countFn('AdnMenu.sortUpDown')
    // console.log(fipi, parent, pd.getAdnDialogWindow())

    dbMpFn.reviewFhirPart(parent)
}

fipiFn.getDbSave = blockName => {
    !pd.dbSave && (pd.dbSave = {})
    blockName &&
        !pd.dbSave[blockName] && (pd.dbSave[blockName] = [])
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
        i(n) { return pd.i(this.adnId, n) },
        sortUp() {
            fipiFn.sortUpDown(-1, this.adnId)
        }, sortDown() {
            fipiFn.sortUpDown(1, this.adnId)
        }, sortPlus() {
            console.log(123)
        }, isPaste() {
            return pd.adnDialogWindow && pd.adnDialogWindow.type == 'paste'
                && (pd.adnDialogWindow.adnIdPaste == this.adnId)
        }, isAdnDialogWindow(type) {
            return this.thisAdnDialogWindow()
                && pd.adnDialogWindow.type == type
        }, deleteAdn1() {
            console.log(this.adnId)
            dbMpFn.addDbSaveList('deleteAdn', this.adnId)
            dbMpView.dbMessagePool && dbMpView.dbMessagePool.addCountCurrentPool()
            console.log(dbMpFn.getDbSaveList('deleteAdn'))
        }, deleteAdn() {
            console.log(this.adnId, 234)
            fipiFn.getDbSave('deleteAdn')
            pd.dbSave.deleteAdn.push(this.adnId)
            console.log(pd.dbSave)
            fipi.edCopyCut.count++
        }
        , insertAdnChild() {
            dbMpFn.addDbSaveList('insertAdnChild', this.adnId)
            dbMpFn.insertAdnChild(this.adnId)
        }
        , thisAdnDialogWindow() { return pd.adnDialogWindow && pd.adnDialogWindow.adnId == this.adnId }
        , isCopy() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCopy == this.adnId }
        , isCut() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCut == this.adnId }
        , setCut() {
            pd.getAdnDialogWindow()
            pd.adnDialogWindow.adnIdCut = this.adnId
            delete pd.adnDialogWindow.adnIdCopy
            fipiFn.reviewAdnMenu(this.ppId, this.pp)
            console.log(pd.adnDialogWindow)
        }, setCopy() {
            pd.getAdnDialogWindow()
            pd.adnDialogWindow.adnIdCopy = this.adnId
            delete pd.adnDialogWindow.adnIdCut
            fipiFn.reviewAdnMenu(this.ppId, this.pp)
            console.log(pd.adnDialogWindow, fipi)
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
            fipiFn.onOffChild(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
        }, viewIdrr2p() {
            this.count++
        },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} </span>
    <div class="w3-dropdown-content w3-border w3-hover-shadow" style="width:18em;">
        <div class="w3-bar w3-tiny">
            <button @click="viewIdrr2p" class="w3-bar-item w3-btn w3-padding-small">{{adnId}}</button>
            <button class="w3-bar-item w3-btn w3-padding-small">r: {{i('reference')}}</button>
            <button class="w3-bar-item w3-btn w3-padding-small">r2: {{i('reference2')}}</button>
            <button class="w3-bar-item w3-btn w3-padding-small">p: {{i('parent')}}</button>
        </div> 
        <button class="w3-btn" @click="sortUp()">⬆</button>
        <button class="w3-btn" @click="sortDown()">⬇</button>
        ｜
        <button class="w3-btn am-b" @click="insertAdnChild()" title="addChild - додати дитину">＋</button>
        <button class="w3-btn am-b" @click="deleteAdn();deleteAdn1()">－</button>
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
            <button class="w3-btn am-b" @click="setCut()" title="cut - вирізати">✀</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
            <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isPaste()" >
                <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste - вставити">⧠</button>
                <div class="w3-small">
                    <button @click="setAdnDialogWindow('paste')" class="w3-btn" 
                        title="reference">type-1 ⮫</button>
                    <button class="w3-btn w3-padding-small" title="copy r">r: {{i('reference')}}</button>
                </div> <div class="w3-small">
                    <button @click="setAdnDialogWindow('paste')" class="w3-btn w3-small" 
                        title="reference2">type-2 ⮫</button>
                    <button class="w3-btn w3-padding-small" title="copy r2">r2: {{i('reference2')}}</button>
                </div>
                <button class="w3-btn am-b" @click="setAdnDialogWindow('paste')" title="paste inner - вставити внутрішній">+₊⧠</button>
            </div>
        </div>
    </div> 
</span>&nbsp;
<span class="w3-small w3-text-blue" v-if="isFixedAdnDialogWindow()">✎</span>
<div class="w3-card-4 w3-leftbar am-width-100pr" v-if="isFixedAdnDialogWindow()" >
    <AdnEnterData :adnId="adnId"/>
</div> <span class="w3-hide"> {{count}} </span>
<span class="w3-small w3-text-blue" v-if="thisAdnDialogWindow()">✎</span>
<span class="w3-small w3-text-blue" v-if="isCopy()">⧉</span>
<span class="w3-small w3-text-blue" v-if="isCut()">✀</span>
`
}
