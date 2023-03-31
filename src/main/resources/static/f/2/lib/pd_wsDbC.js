'use strict'
export const
    sql_app = {} //sql_app: SQL Library
    , pd = {
        session: {}, //sn: session
    } //pd: Page Data
    , wsDbC = {} // WebSocket dbSelect Container

wsDbC.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

const eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , sql_app2 = {}

pd.eMap = eMap
pd.parentChild = parentChild

wsDbC.runWsOpenInPromise = (sendJson) => {
    const send = JSON.stringify(
        Object.assign(sendJson, { sql: wsDbC.replaceAdnId(sendJson) }))
    wsDbC.wsDbSelect.onopen = event => wsDbC.wsDbSelect.send(send)
    return new Promise((thenFn, reject) => wsDbC.wsDbSelect
        .onmessage = event => thenFn(event))
}

wsDbC.replaceAdnId = sendJson => sql_app2.replaceSql(sql_app[sendJson.sqlName].sql)
    .replace(':adnId', sendJson.adnId)

wsDbC.listDeepNum = deep => Array.from(Array(deep), (_, i) => i + 1)
    .reduce((n, m) => n.push(Array.from(Array(m), (_, i) => i + 1)) && n, [])

wsDbC.listDeepSql = (a, inl) => a.reduce((n, m) => n.push(m.reduce((n1, m1) => m1 > 1
    && 'SELECT doc_id FROM doc WHERE parent IN (' + n1 + ')' || n1, inl)) && n, [])


sql_app2.replaceSql = sql => {

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
        let sql_inner = sql_app2.readSql2R(sql_name)
        sql = sql.replace(sql_app + sql_name, sql_inner)
    }
    return '' + sql
}
sql_app2.readSql2R = sqlN => sql_app[sqlN] && sql_app2.replaceSql(sql_app[sqlN].sql)

sql_app.adn01NodesIn = {
    name: "adn01OneNode: 'One Data Node' ::adn01",
    sql: "SELECT * FROM (:sql_app.adn01 ) x WHERE doc_id IN (:adnId)",
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
