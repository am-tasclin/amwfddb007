'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'

export default {
    data() { return { count: 0 } },
    mounted() { fipi.edCopyCut = this },
    methods: {
        adnIdCopy() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCopy },
        adnIdCut() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCut },
        adnId() { return pd.adnDialogWindow && pd.adnDialogWindow.adnId },
    }, template: `
<span class="w3-tiny w3-opacity">
    <span class="w3-text-blue" v-if="adnId()"> ✎ {{adnId()}} </span>
    <span class="w3-text-blue" v-if="adnIdCopy()"> ⧉ {{adnIdCopy()}} </span>
    <span class="w3-text-blue" v-if="adnIdCut()"> ✀ {{adnIdCut()}} </span>
</span> <span class="w3-hide"> {{count}} </span>
<span class="w3-right w3-opacity">&nbsp;︳</span>
`,
}