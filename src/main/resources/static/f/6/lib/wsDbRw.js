'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { mcd, addToEMap, addToParentChild } from '/f/6/lib/MetaContentData.js'
import { pushListUnique } from '/f/6/lib/algoritmed-commons.js'

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
export const ws = new WebSocket(uri_wsDbRw)

export const readDppForParent = (parentId, fn) => {
    const sql = sql_vl_str.concat('WHERE parent = :parentId').replace(':parentId', parentId)
    executeSelectQuery(sql).then(json => {
        // console.log(parentId, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        readR1R2(mcd.parentChild[parentId], 'r', fn)
    })
}

export const readDppFromList = (uniqueMcdIdList, fn) =>
    readMcdIdListStr(uniqueMcdIdList).then(json => {
        // console.log('← ', json, mcd, fn)
        addToEMap(json.list)
        // reView(uniqueMcdIdList)
        readR1R2(uniqueMcdIdList, 'r', fn)
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

const executeSelectQuery = sql => {
    ws.send(JSON.stringify({ sql: sql, cmd: 'executeQuery' }))
    return new Promise((thenFn, reject) => ws.onmessage = event => thenFn(JSON.parse(event.data)))
}
