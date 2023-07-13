'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd, addToEMap, addToParentChild } from '/f/6/lib/MetaContentData.js'
import { pushListUnique, addToUniqueList } from '/f/6/lib/algoritmed-commons.js'

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
export const ws = new WebSocket(uri_wsDbRw)

export const readDppForParent = (parentIdl, fn) => {
    const sql = sql_vl_str_WHERE_parent_sort.replace(':parentId', parentIdl.join(','))
    return executeSelectQuery(sql).then(json => {
        // console.log(parentIdl, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        const x = parentIdl.reduce((l, pId) => l.concat(mcd.parentChild[pId]), [])
        readR1R2(x, 'r', fn)
    })
}

export const readOpenedParent = (uniqueMcdId_openedId, fn) => {
    const loId = uniqueMcdId_openedId.filter(id => !mcd.parentChild[id])
        .reduce((l, id) => l.push(id) && l, [])
    loId.length > 0 && readDppForParent(loId, fn)
}

export const readDocAndParentList = (dpList, fn) => {
    let where = ''
    dpList.doc_id.length && (where += 'doc_id IN (' + dpList.doc_id.join(',') + ')')
    dpList.doc_id.length && dpList.parent.length && (where += ' OR ')
    dpList.parent.length && (where += 'parent IN (' + dpList.parent.join(',') + ')')
    const sql = sql_vl_str_WHERE_sort.replace(':where', where)
    return executeSelectQuery(sql).then(json => {
        // console.log(dpList, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        const toRrExtencon = addToUniqueList((dpList.doc_id).concat(dpList.parent)
            .concat(dpList.parent.reduce((l, i) => l.concat(mcd.parentChild[i]), [])), [])
        readR1R2(toRrExtencon, 'r', fn)
    })
}

export const readDppFromList = (uniqueMcdId_list, fn) =>
    readMcdIdListStr(uniqueMcdId_list).then(json => {
        console.log('← ', json, mcd)
        addToEMap(json.list)
        readR1R2(uniqueMcdId_list, 'r', fn)
    })

const readR1R2 = (uniqueMcdIdList, rName, fn) => {
    // console.log(uniqueMcdIdList, rName, mcd.eMap)
    const refIds = uniqueMcdIdList.filter(adnId => mcd.eMap[adnId][rName])
        , rList = refIds.reduce((o, adnId) => pushListUnique(o, mcd.eMap[adnId][rName]), [])
    rList.length > 0 && readMcdIdListStr(rList).then(json => {
        const eMapVlStr = json.list.reduce((o, r) => (o[r.doc_id] = r.vl_str) && o || o, {})
            , rvName = rName + '_vl_str'
        // console.log('←', rName, eMapVlStr)
        refIds.forEach(adnId => mcd.eMap[adnId][rvName] = eMapVlStr[mcd.eMap[adnId][rName]])
        // reView(refIds)
        'r' == rName && readR1R2(uniqueMcdIdList, 'r2', fn)
        'r2' == rName && fn && fn()
    })
    rList.length == 0 && 'r' == rName && readR1R2(uniqueMcdIdList, 'r2', fn)
    rList.length == 0 && 'r2' == rName && fn && fn()
}

const readMcdIdListStr = uniqueMcdIdList => {
    const sql = sql_vl_str.concat('WHERE doc_id IN (:idList)').replace(':idList', uniqueMcdIdList.join(','))
    // console.log('→', sql)
    return executeSelectQuery(sql)
}

const sql_vl_str = 'SELECT doc_id, parent p, reference r, reference2 r2, value vl_str FROM doc \n\
LEFT JOIN string ON doc_id=string_id \n'

const sql_vl_str_WHERE_sort = sql_vl_str.replace('vl_str FROM', 'vl_str, sort FROM') + 'LEFT JOIN sort ON doc_id=sort_id \n\
WHERE :where \n\
ORDER BY sort'

const sql_vl_str_WHERE_parent_sort = sql_vl_str_WHERE_sort.replace(':where', 'parent IN (:parentId)')

// const sql_vl_str_sort1 = sql_vl_str + 'LEFT JOIN sort ON doc_id=sort_id \n\
// WHERE parent IN (:parentId) \n\
// ORDER BY sort'
/**
 * Execute SQL SELECT query
 * @param {*} sql 
 * @returns results row list
 */
const executeSelectQuery = sql => execute_SQL_API({ sql: sql, cmd: 'executeQuery' })

/**
 * Execute some SQL with WebSocket API from REST /dbRw
 * @param {*} sqlApi 
 * @returns result
 */
export const execute_SQL_API = sqlApi => {
    ws.send(JSON.stringify(sqlApi))
    return new Promise((thenFn, reject) => ws.onmessage = event => thenFn(JSON.parse(event.data)))
}

import { getDbMessagePoolCt, dbMessagePool } from '/f/6/lib/DbMessagePool.js'
/**
 * Update string content
 * @param {*} dbMessage 
 */
export const wsUpdateString = dbMessage => {
    dbMessagePool[dbMessage.countCurrentPool = getDbMessagePoolCt().countCurrentPool] = dbMessage
    dbMessage.cmd = 'updateString'
    getDbMessagePoolCt().countCurrentPool++
    console.log(dbMessage)
    return execute_SQL_API(dbMessage)
}
