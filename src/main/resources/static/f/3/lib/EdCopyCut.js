'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'

export default {
    data() { return { count: 0 } },
    mounted() { fipi.edCopyCut = this },
    methods: {
        dbSave() { return pd.dbSave },
        adnIdCopy() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCopy },
        adnIdCut() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCut },
        adnId() { return pd.adnDialogWindow && pd.adnDialogWindow.adnId },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-tiny w3-opacity">
        <span class="w3-text-blue" v-if="adnId()"> ✎ {{adnId()}} </span>
        <span class="w3-text-blue" v-if="adnIdCopy()"> ⧉ {{adnIdCopy()}} </span>
        <span class="w3-text-blue" v-if="adnIdCut()"> ✀ {{adnIdCut()}} </span>
    </span>
    <div class="w3-dropdown-content w3-border" style="right: -1em; width: 33em;">
    <button class="w3-btn"> save sort </button>
    {{dbSave() && dbSave().sortParentChild}}
    </div>
</span> <span class="w3-hide"> {{count}} </span>
<span class="w3-right w3-opacity">&nbsp;︳</span>
`,
}