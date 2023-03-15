'use strict'
import { pd, sql_app, wsDbC } from '/fip/1/1/l1.js'
export default {
    props: { adnId: Number, pp: String }, data() { return { count: 1, sql: '' } },
    template: `
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        <button v-for="im in ['buildJSON','buildSQL']"
            class="w3-btn" @click="buildType(im)">{{im}}</button>
    </div> <span class="w3-hide"> {{count}} </span>
</span>
<button class="w3-small w3-btn w3-padding-small w3-leftbar"
    @click="buildSqlSelect()"> SELECT </button>
<div style="white-space: pre; overflow: auto;"
        class="w3-opacity w3-small w3-border-top">
    {{sql}}
    <table v-if="panel2Conf().sqlList">
        <tr>
            <th class="w3-light-grey w3-hover-shadow"
                v-for="(v,k) in panel2Conf().sqlList[0]">{{k}}</th>
        </tr>
        <tr v-for="row in panel2Conf().sqlList" class="w3-hover-shadow">
            <td class="w3-border-right" v-for="(v,k) in row"> {{v}} </td>
        </tr>
    </table>
</div>
    `,
    methods: {
        panel2Conf() { return pd.panel2Conf(this.adnId, this.pp) },
        buildSqlSelect() {
            const sqlAdd = { contentJoin: {}, sqlStr: { fieldsJoin: '', joinValues: '' } }
                , buildSqlType = 'r1Type_Value'

            sql_app.build[buildSqlType](this.adnId, sqlAdd)

            wsDbC.sendAndSetMessageFn({ sql: sqlAdd.sql, adnId: this.adnId }
            ).then(event => {
                const l = JSON.parse(event.data).list
                console.log(l);
                pd.panel2Conf(this.adnId, this.pp).sqlList = l
                this.sql = sqlAdd.sql
            })
        },
        buildType(im) { pd.buildPanel2ConfType(im, this.adnId, this.pp) },
    },
}

sql_app.r1Type_Value = {
    name: 'Template to generate SELECT in moore styles, example: reference:<<type>>, reference2:<<value>>',
    shortName: 'vTable ⁙r1type:value',
    // sql: 'SELECT :fieldsJoin d1.* FROM doc d1 \n\
    sql: 'SELECT :fieldsJoin FROM doc d1 \n\
        :joinValues WHERE d1.parent = :adnId'
}
/** */
sql_app.build = {}
/**
 * 
 * @param {*} adnId 
 * @param {*} sqlAdd 
 * @returns sqlAdd
 */
sql_app.build.r1Type_Value = (adnId, sqlAdd) => {

    console.log(adnId, sqlAdd, pd.parentChild[adnId][0])
    sql_app.build.contentJoin(sqlAdd.contentJoin,
        { newObjKey: pd.parentChild[adnId][0], columnAdnId: pd.parentChild[adnId][0], suffix: '_r1t_v', }
    )
    sql_app.build.montage001SqlAdd(adnId, sqlAdd)
    return sqlAdd
}
/**
 * 
 * @param {*} sqlAddObj 
 * @param {newObjKey:*, columnAdnId:<<adnId*>>, suffix:*} params - parts of new Object
 * @returns 
 */
sql_app.build.contentJoin = (sqlAddObj, params) => (
    // sqlAddObj.contentJoin[parentChild[adnId][0]] = {
    sqlAddObj[params.newObjKey] = {
        key: 'c_' + params.columnAdnId + params.suffix,
        alias: '' + pd.eMap[pd.eMap[pd.eMap[params.columnAdnId].reference].parent].value_22
            + '_' + (pd.eMap[params.columnAdnId].r_value_22 || pd.eMap[params.columnAdnId].rr_value_22),
    })
/**
 * Montage: filedNames, LEFT_JOIN groups and end SQL SELECT v.001.
 * @param {*} adnId 
 * @param {*} sqlAdd 
 * @returns sqlAdd
 */
sql_app.build.montage001SqlAdd = (adnId, sqlAdd) => Object.keys(sqlAdd.contentJoin).reduce(
    (n, adnId) => {
        sqlAdd.sqlStr.fieldsJoin
            += sqlAdd.contentJoin[adnId].key + '.value ' + sqlAdd.contentJoin[adnId].alias + ', '
        sqlAdd.sqlStr.joinValues
            += 'LEFT JOIN string ' + sqlAdd.contentJoin[adnId].key + ' ON '
            + sqlAdd.contentJoin[adnId].key + '.string_id=d1.doc_id \n'
        sqlAdd.contentJoin[adnId].r2a && (() => {
            sqlAdd.sqlStr.fieldsJoin += sqlAdd.contentJoin[adnId].r2a.key + '.* ,'
            sqlAdd.sqlStr.joinValues
                += 'LEFT JOIN (SELECT ' + sqlAdd.contentJoin[adnId].r2a.key
                + '.value ' + sqlAdd.contentJoin[adnId].r2a.alias
                + ' , d1.doc_id ' + sqlAdd.contentJoin[adnId].r2a.alias
                + '_id \n FROM doc d1 LEFT JOIN string '
                + sqlAdd.contentJoin[adnId].r2a.key + ' \n ON ' + sqlAdd.contentJoin[adnId].r2a.key
                + '.string_id=d1.doc_id ) '
                + sqlAdd.contentJoin[adnId].r2a.key + ' \n ON ' + sqlAdd.contentJoin[adnId].r2a.key + '.'
                + sqlAdd.contentJoin[adnId].r2a.alias + '_id=d1.reference2 '
            console.log(adnId, sqlAdd)
        })()
        return true
    }, '') && (
        sqlAdd.sql
        = sql_app.r1Type_Value.sql
            .replace(':fieldsJoin', sqlAdd.sqlStr.fieldsJoin + ' d1.*')
            .replace(':joinValues', sqlAdd.sqlStr.joinValues)
            .replace(':adnId', adnId)
    ) && sqlAdd
