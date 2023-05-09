'use strict'
import { pd, sql_app_ws } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'

sql_app_ws.getSendSql = () => sql_app_ws.sendSql || (sql_app_ws.sendSql = {})
sql_app_ws.sqlSort = parentSortId => {
    sql_app_ws.getSendSql()
    !sql_app_ws.sendSql.sort
        && (sql_app_ws.sendSql.sort = {})
    !sql_app_ws.sendSql.sort[parentSortId]
        && (sql_app_ws.sendSql.sort[parentSortId] = {})
    sql_app_ws.sendSql.sort[parentSortId]
        && delete sql_app_ws.sendSql.sort[parentSortId].l
    sql_app_ws.sendSql.sort[parentSortId].l = []

    pd.parentChild[parentSortId].forEach((adnId, i) => sql_app_ws.sendSql.sort[parentSortId]
        .l.push({ adnId: adnId, sort: 1 + i }))

}

export default {
    data() { return { count: 0 } },
    mounted() { fipi.edCopyCut = this },
    methods: {
        save1Sort(parentSortId) {
            sql_app_ws.sqlSort(parentSortId)
            console.log(sql_app_ws.sendSql)
        }, saveSort() {
            pd.dbSave.sortParentChild
                .forEach(parentSortId => sql_app_ws.sqlSort(parentSortId))
            console.log(sql_app_ws.sendSql)
        },
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
        <div class="w3-right" v-if="dbSave()">
            <button @click="save1Sort(parentSortId)" class="w3-btn w3-padding-small"
            v-for="parentSortId in dbSave().sortParentChild">
                {{parentSortId}}, </button>
            <button @click="saveSort" class="w3-btn"> save sort </button>
        <div>
    </div>
</span> <span class="w3-hide"> {{count}} </span>
<span class="w3-right w3-opacity">&nbsp;︳</span>
`,
}