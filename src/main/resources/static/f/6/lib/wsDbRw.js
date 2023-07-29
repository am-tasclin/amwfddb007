'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd, setToEMap } from '/f/6/lib/MetaContentData.js'
import { pushListUnique, addToUniqueList } from '/f/6/lib/algoritmed-commons.js'

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
export const ws = new WebSocket(uri_wsDbRw)

export const addToParentChild = jsonAdnList =>
    jsonAdnList.forEach(adn => (mcd.parentChild[adn.p] || (mcd.parentChild[adn.p] = [])).push(adn.doc_id))

export const addToEMap = jsonAdnList => jsonAdnList.forEach(adn => setToEMap(adn))

export const readDppForParent = (parentIdl, fn) => {
    const sql = sql_vl_str_WHERE_parent_sort.replace(':parentId', parentIdl.join(','))
    return executeSelectQuery(sql).then(json => {
        // console.log(parentIdl, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        const listR1R2 = parentIdl.reduce((l, pId) => l.concat(mcd.parentChild[pId]), [])
        // console.log(listR1R2)
        readR1R2(listR1R2, 'r', fn)
    })
}

export const readOpenedParent = (uniqueMcdId_openedId, fn) => {
    const loId = uniqueMcdId_openedId.filter(id => !mcd.parentChild[id])
        .reduce((l, id) => l.push(id) && l, [])
    loId.length > 0 && readDppForParent(loId, fn)
}

/**
 * 
 * @param {*} dpList 
 * @param {*} fn 
 * @returns 
 */
export const readFilesAndFolders = (dpList, fn) => executeSelectQuery(
    select_InDocOrParent(dpList)
).then(json => {
    mcd.fileList = json.list.filter(o => o.r == 376600) //isFile (H1)
        .reduce((l, o) => l.push(o.doc_id) && l, [])
    addToEMap(json.list)
    fn(json)
})

const select_InDocOrParent = dpList => {
    let where = ''
    dpList.doc_id.length && (where += 'doc_id IN (' + dpList.doc_id.join(',') + ')')
    dpList.doc_id.length && dpList.parent.length && (where += ' OR ')
    dpList.parent.length && (where += 'parent IN (' + dpList.parent.join(',') + ')')
    return sql_vl_str_WHERE_sort.replace(':where', where)
}

export const readDocAndParentList = (dpList, fn) => {
    console.log(dpList)
    const sql = select_InDocOrParent(dpList)
    console.log(sql)
    return executeSelectQuery(sql).then(json => {
        console.log(dpList, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        const toRrExtencon = addToUniqueList(dpList.doc_id.concat(dpList.parent)
            .concat(dpList.parent.filter(i => mcd.parentChild[i]).reduce((l, i) => l.concat(mcd.parentChild[i]), [])), [])
        console.log(toRrExtencon)
        readR1R2(toRrExtencon, 'r', fn)
    })
}

export const readDppFromList = (uniqueMcdId_list, fn) => {
    readMcdIdListStr(uniqueMcdId_list).then(json => {
        // console.log('← ', json, mcd)
        addToEMap(json.list)
        readR1R2(uniqueMcdId_list, 'r', fn)
    })
}

const readR1R2 = (uniqueMcdIdList, rName, fn) => {
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
ORDER BY parent, sort'
// ORDER BY sort'

const sql_vl_str_WHERE_parent_sort = sql_vl_str_WHERE_sort.replace(':where', 'parent IN (:parentId)')

// const sql_vl_str_sort1 = sql_vl_str + 'LEFT JOIN sort ON doc_id=sort_id \n\
// WHERE parent IN (:parentId) \n\
// ORDER BY sort'
/**
 * Execute SQL SELECT query
 * @param {*} sql 
 * @returns results row list
 */
export const executeSelectQuery = sql => execute_SQL_API({ sql: sql, cmd: 'executeQuery' })

/**
 * Execute some SQL with WebSocket API from REST /dbRw
 * @param {*} sqlApi 
 * @returns result
 */
export const execute_SQL_API = sqlApi => {
    ws.send(JSON.stringify(sqlApi))
    return new Promise((thenFn, reject) => ws.onmessage = event => thenFn(JSON.parse(event.data)))
}

import { addDbMessageToPool } from '/f/6/lib/DbMessagePool.js'
/**
 * Update string content
 * @param {*} dbMessage 
 */
export const wsUpdateString = dbMessage =>
    (dbMessage.cmd = 'updateString') && execute_SqlChange_API(dbMessage)
// dbMessage.cmd = 'updateString'
// addDbMessageToPool(dbMessage)
// return execute_SQL_API(dbMessage)

export const wsUpdateR1 = dbMessage =>
    (dbMessage.cmd = 'updateR1') && execute_SqlChange_API(dbMessage)

export const wsUpdateR2 = dbMessage =>
    (dbMessage.cmd = 'updateR2') && execute_SqlChange_API(dbMessage)

export const wsInsertAdnString = dbMessage =>
    (dbMessage.cmd = 'insertAdnString') && execute_SqlChange_API(dbMessage)

export const wsInsertAdnChild = dbMessage =>
    (dbMessage.cmd = 'insertAdnChild') && execute_SqlChange_API(dbMessage)

export const wsInsertString = dbMessage =>
    (dbMessage.cmd = 'insertString') && execute_SqlChange_API(dbMessage)

export const wsSave1ParentSort = dbMessage =>
    (dbMessage.cmd = 'save1ParentSort') && execute_SqlChange_API(dbMessage)

const execute_SqlChange_API = dbApiMessage => {
    addDbMessageToPool(dbApiMessage)
    console.log(dbApiMessage)
    return execute_SQL_API(dbApiMessage)
}

export const wsDeleteAdn1 = dbMessage => {
    dbMessage.cmd = 'deleteAdn1'
    addDbMessageToPool(dbMessage)
    return execute_SQL_API(dbMessage)
}
