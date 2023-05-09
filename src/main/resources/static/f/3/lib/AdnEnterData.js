'use strict'
import { pd, sql_app_ws } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'

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
            sql_app_ws.sqlUpdate(this.adnId, 'string', this.value_22)
            fipi.edCopyCut && fipi.edCopyCut.count++
        },
    }, template: `
<div class="w3-container">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="value_22" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">OK</button>
    {{adnId}}
</div> <span class="w3-hide"> {{count}} </span>
    `,
}
