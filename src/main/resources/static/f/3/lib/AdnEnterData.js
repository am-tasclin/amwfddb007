'use strict'
import { pd, sql_app_ws } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'
import { dbMpData, dbMpFn, dbMpView } from '/f/3/lib/wsDbRw.js'

sql_app_ws.sqlUpdate = (adnId, contentTableName, fieldValue) => {
    sql_app_ws.getSendSql()
    !sql_app_ws.sendSql.update
        && (sql_app_ws.sendSql.update = {})
    !sql_app_ws.sendSql.update[adnId]
        && (sql_app_ws.sendSql.update[adnId] = {})
        || delete sql_app_ws.sendSql.update[adnId][contentTableName]
    sql_app_ws.sendSql.update[adnId][contentTableName] = fieldValue
    console.log(adnId, sql_app_ws.sendSql)
}

export default {
    props: { adnId: Number, },
    data() { return { count: 0, value_22: pd.eMap[this.adnId].value_22 } },
    methods: {
        enterData() {
            dbMpFn.getDbSaveObject('saveContent')[this.adnId] = { string: this.value_22.trim() }
            console.log(dbMpData, 123)
            dbMpView.dbMessagePool && dbMpView.dbMessagePool.addCountCurrentPool()

            sql_app_ws.sqlUpdate(this.adnId, 'string', this.value_22.trim())
            fipi.edCopyCut && fipi.edCopyCut.countFn('AdnEnterData')
        },
    }, template: `
<div class="w3-container">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="value_22" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">send Db - відправити БД</button>
    {{adnId}}
</div> <span class="w3-hide"> {{count}} </span>
    `,
}
