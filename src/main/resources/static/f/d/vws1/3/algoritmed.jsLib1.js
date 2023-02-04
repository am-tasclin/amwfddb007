/**
 * @license Algoritmed.js v0.1.025
 * (c) 2021-2023 Algoritmed Ltd. http://algoritmed.com
 * License: Apache-2.0 license 
 */

'use strict'
const jsLib1 = {}, sql_app = {}
    , d = {}/** d: is for data */
jsLib1.hash = window.location.hash
jsLib1.isHash = hn => jsLib1.hash.includes(hn + '_')
jsLib1.init = () => jsLib1.isHash('init'
) && JSON.parse(decodeURI(jsLib1.hash.split("init_")[1]))

jsLib1.hashTitle = () => {
    let ht = jsLib1.hash.split('_')[0].substr(1, 33) + ':'
        , ht2 = jsLib1.hash.split('_')[1]
    if (jsLib1.isHash('init'))
        ht += decodeURI(ht2).substr(15, 25)
    else ht += decodeURI(ht2).substr(0, 20)
    return ht
}

if (jsLib1.isHash('init')) {
    d.init = jsLib1.init()
} else if (jsLib1.isHash('child')) {
    let adnId = jsLib1.hash.split('child_')[1].split('_')[0]
    if (!d.init)
        d.init = { tree: { l: { id: [adnId], openIds: [] }, r: { id: [adnId], openIds: [] } } }
    console.log(123, adnId, d.init)
} else if (jsLib1.isHash('tree')) {
    if (!d.init)
        d.init = { tree: { l: { id: [], openIds: [] }, r: { id: [], openIds: [] } } }
    d.init.tree.l.id = jsLib1.hash.split('tree_')[1].split(',')[0].split('_')
    d.init.tree.r.id = jsLib1.hash.split('tree_')[1].split(',')[1].split('_')
}

jsLib1.treeStr = () => d.init.tree.l.id.join('_') + ',' + d.init.tree.r.id.join('_')

jsLib1.makeElFrom = (el, propsList) => {
    const r = {}, nl = propsList.trim().split(' ')
    el && nl.forEach(prop => el[prop] && (r[prop] = el[prop]))
    return r
}

/** NOT DELETE TO 2023.09.01
 * 
d.count = 1
d.parentChild = {}
d.eMap = {}
d.eMap2 = {
    "369864": {
        "doc_id": 369864, "doctype": null, "reference": 369789
        , "parent": 373473, "reference2": 369767, "r_doctype": null, "value_22": "ServiceRequest"
        , "value_u_22": null, "value_24": null, "value_25": null, "rr_value_22": "Resource", "r_value_22": "DomainResource"
        , "r2_doctype": null, "r2_value_22": "Request", "sort": 11
    }
    , "373530": {
        "doc_id": 373530, "doctype": 14, "reference": null, "parent": 45, "reference2": null
        , "r_doctype": null, "value_22": "eHealth in ua", "value_u_22": null, "value_24": null, "value_25": null
        , "rr_value_22": null, "r_value_22": null, "r2_doctype": null, "r2_value_22": null, "sort": 1
    }
}
d.openedAdnVlMenu = 0
d.adnIdMO = 0
*/

sql_app.adn01Childrens = {
    name: "adn01OneNode: 'One Data Node' ::adn01",
    sql: "SELECT x.* FROM (:sql_app.adn01 ) x LEFT JOIN sort s ON doc_id=sort_id\n\
    WHERE parent = :adnId ORDER BY s.sort",
}

sql_app.adn01OneNode = {
    name: "adn01OneNode: 'One Data Node' ::adn01",
    sql: "SELECT * FROM (:sql_app.adn01 ) x WHERE doc_id  = :adnId",
}

sql_app.adn01 = {
    name: 'adn01: Abstract Data Node 01',
    sql: "SELECT d.*, dr.doctype r_doctype, s.value value_22, su.value value_u_22, f.value value_24  \n\
    , ts.value value_25, srr.value rr_value_22 \n\
    , sr.value r_value_22, dr2.doctype r2_doctype \n\
    , sr2.value r2_value_22, o.sort \n\
    FROM doc d \n\
    LEFT JOIN string s ON s.string_id =d.doc_id \n\
    LEFT JOIN string_u su ON su.string_u_id =d.doc_id \n\
    LEFT JOIN double f ON f.double_id =d.doc_id \n\
    LEFT JOIN timestamp ts ON ts.timestamp_id =d.doc_id \n\
     LEFT JOIN doc dr ON dr.doc_id =d.reference \n\
     LEFT JOIN string sr ON sr.string_id =d.reference \n\
     LEFT JOIN string srr ON srr.string_id =dr.reference \n\
     LEFT JOIN doc dr2 ON dr2.doc_id =d.reference2 \n\
     LEFT JOIN string sr2 ON sr2.string_id =d.reference2 \n\
     LEFT JOIN sort o ON sort_id =d.doc_id ",
}

jsLib1.replaceSql = sql => {

    while (sql.includes(':fn_sql_app.')) {
        const sql_fnStr = sql.split(':fn_sql_app.')[1].split(' ')[0]
        let sql_fnPath = sql_fnStr.split('.')
        const fnName = firstFunctionName(sql_fnPath)
        // console.log(sql_fnStr, fnName)
        const fnParamsStr = sql_fnStr.split(fnName + '(')[1].split(')')[0]
        // console.log(sql_fnStr, fnName, '\n-fn(PARAMS)->\n', fnParamsStr)
        sql_fnPath = sql_fnStr.split('.')
        // console.log(sql_fnStr, sql_fnPath, 1)
        const fnObj = firstFunctionObj(sql_app[sql_fnPath.shift()], sql_fnPath)
        sql_fnPath = fnParamsStr.split('.')
        // console.log(sql_fnPath)
        const fnParamObj = pathValue(sql_app[sql_fnPath.shift()], sql_fnPath)
        // console.log(fnObj, fnParamObj)
        let fnSql = fnObj(fnParamObj)
        sql = sql.replace(':fn_sql_app.' + sql_fnStr, fnSql)
        // console.log(sql)
    }

    while (sql.includes(':var_sql_app.')) {
        const sql_varName = sql.split(':var_sql_app.')[1].split(' ')[0],
            sql_varPath = sql_varName.split('.'),
            sql_varVal = pathValue(sql_app[sql_varPath.shift()], sql_varPath)
        // console.log(sql_varName, '=', sql_varVal)
        sql = sql.replace(':var_sql_app.' + sql_varName, sql_varVal)
    }

    // let sql_app = ':sql_app'
    let sql_app = ':sql_app.'
    while (sql.includes(sql_app)) {
        let sql_name = sql.split(sql_app)[1].split(' ')[0]
        // console.log(sql_name)
        let sql_inner = jsLib1.readSql2R(sql_name)
        sql = sql.replace(sql_app + sql_name, sql_inner)
    }
    return '' + sql
}
jsLib1.readSql2R = sqlN => sql_app[sqlN] && jsLib1.replaceSql(sql_app[sqlN].sql)
