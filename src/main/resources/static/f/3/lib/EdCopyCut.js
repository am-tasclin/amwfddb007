'use strict'
import { pd, sql_app_ws } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'
import { wsDbRw } from '/f/3/lib/wsDbRw.js'

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

const updateDbMessage = adnId => {
    !adnId && (adnId = Object.keys(sql_app_ws.sendSql.update)[0])
    sql_app_ws.sendSql.update[adnId].status = 'inProgres'
    save1Update(adnId)
    Object.keys(sql_app_ws.sendSql.update).length > 0
        && fipi.edCopyCut.countFn()
}, save1Sort = parentSortId => {
    sql_app_ws.sendSql.sort[parentSortId].l.forEach(s1s => {
        const sendJson = Object.assign(s1s
            , { adnId: s1s.adnId, cmd: 'save1Sort' })
        console.log(sendJson)
        wsDbRw.exchangeRwMessage(sendJson).then(event => {
            const json = JSON.parse(event.data)
            console.log(json)
        })
    })
}, save1Update = adnUpdateId => {
    const sendJson = Object.assign(sql_app_ws.sendSql.update[adnUpdateId]
        , { adnId: adnUpdateId, cmd: 'updateString' })
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        pd.eMap[json.adnId].value_22 = json.string
        fipiFn.reviewFhirPart(json.adnId)
        delete sql_app_ws.sendSql.update[json.adnId]
            && fipi.edCopyCut.countDbSaved++
        fipi.edCopyCut.countFn()
    })
}

export default {
    data() { return { count: 0, countDbSaved: 0 } },
    mounted() {
        fipi.edCopyCut = this
    }, methods: {
        sendSql() { return sql_app_ws.sendSql },
        countFn(from) {
            const update = sql_app_ws.sendSql && sql_app_ws.sendSql.update
                && Object.keys(sql_app_ws.sendSql.update)
                    .filter(i => 'inProgres' !=
                        sql_app_ws.sendSql.update[i].status).length || 0
                , sortParentChild = pd.dbSave && pd.dbSave.sortParentChild
                    && pd.dbSave.sortParentChild.length || 0
            this.count = sortParentChild + update
            console.log(this.count, from
                , sortParentChild, update)
            update > 0 && updateDbMessage()
        }, save1Sort(parentSortId) {
            sql_app_ws.sqlSort(parentSortId)
            console.log(sql_app_ws.sendSql)
            save1Sort(parentSortId)
        }, saveSort() {
            pd.dbSave.sortParentChild
                .forEach(parentSortId => sql_app_ws.sqlSort(parentSortId))
            console.log(sql_app_ws.sendSql)
        }, save1Update(adnUpdateId) { save1Update(adnUpdateId) }
        , saveUpdate() {
            console.log(sql_app_ws.sendSql.update)
        },
        dbSave() { return pd.dbSave },
        adnIdCopy() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCopy },
        adnIdCut() { return pd.adnDialogWindow && pd.adnDialogWindow.adnIdCut },
        adnId() { return pd.adnDialogWindow && pd.adnDialogWindow.adnId },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-tiny w3-opacity w3-hover-shadow w3-card">
        <span class="w3-text-blue" v-if="adnId()"> ✎ {{adnId()}} </span>
        <span class="w3-text-blue" v-if="adnIdCopy()"> ⧉ {{adnIdCopy()}} </span>
        <span class="w3-text-blue" v-if="adnIdCut()"> ✀ {{adnIdCut()}} </span>
        &nbsp; <sub> {{count}} </sub>/<sup>{{countDbSaved}}</sup> ䷢ &nbsp;
    </span>
    <div class="w3-dropdown-content w3-border w3-right-align w3-hover-shadow" style="right: -1em; width: 33em;">
        <span class="w3-tiny w3-opacity w3-left">DB messages</span>
        <div class="" v-if="dbSave()">
            <span class="w3-tiny am-1b w3-opacity">save one sort &nbsp;</span>
            <button @click="save1Sort(parentSortId)" class="w3-btn w3-padding-small"
                    v-for="parentSortId in dbSave().sortParentChild">
                {{parentSortId}}, </button>
                <span class="w3-opacity">|</span>
            <button @click="saveSort" class="w3-btn"> save all sort </button>
        </div>
        <div class="w3-border-top" v-if="sendSql() && sendSql().update">
            <button class="w3-btn" @click="saveUpdate"> saveUpdate </button>
            <div v-for="( update, adnUpdateId) in sendSql().update ">
                <span class="w3-yellow w3-left w3-tiny"> {{update.status}} </span>
                {{update.string}}
                <button class="w3-btn" @click="save1Update(adnUpdateId)"> {{adnUpdateId}} </button>
            </div>
        </div>
    </div>
</span> 
<span class="w3-right w3-opacity">&nbsp;︳</span>
`,
}
