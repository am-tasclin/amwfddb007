'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { mcd, addToEMap, addToParentChild } from '/f/5/lib/MetaContentData.js'
import { dppInteractivity } from '/f/5/libTGridDpp/metalTGridDpp.js'
import { pushListUnique } from '/f/5/lib/ConfDomPagePart.js'
//export 
const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java
const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
export const ws = wsDbRw.ws = new WebSocket(uri_wsDbRw)

export const Okeys = Object.keys
export const fileFolder = {}
const ffInteractivity = { components: {} }
export const
    setFfInteractivityComponent = (n, ct) =>
        ffInteractivity.components[n] = ct,
    getFfInteractivityComponent = n =>
        ffInteractivity.components[n]

const reView = jsonList => jsonList.forEach(adnId => {
    dppInteractivity.appComponents.meMap[adnId] &&
        Okeys(dppInteractivity.appComponents.meMap[adnId])
            .forEach(im => dppInteractivity.appComponents.meMap[adnId][im].count++)
    dppInteractivity.appComponents.dev.count++
})

const readR1R2 = (uniqueMcdIdList, rName, fn) => {
    // console.log(uniqueMcdIdList, rName, mcd.eMap)
    const refIds = uniqueMcdIdList.filter(adnId => mcd.eMap[adnId][rName])
        , rList = refIds.reduce((o, adnId) => pushListUnique(o, mcd.eMap[adnId][rName]), [])
        , rvName = rName + '_vl_str'
    rList.length > 0 && readMcdIdListStr(rList).then(json => {
        const eMapVlStr = json.list.reduce((o, r) => (o[r.doc_id] = r.vl_str) && o || o, {})
        // console.log('←', rName, eMapVlStr)
        refIds.forEach(adnId => mcd.eMap[adnId][rvName] = eMapVlStr[mcd.eMap[adnId][rName]])
        reView(refIds)
        'r' == rName && readR1R2(uniqueMcdIdList, 'r2', fn)
    })
    rList.length == 0 && 'r' == rName && readR1R2(uniqueMcdIdList, 'r2', fn)
    'r2' == rName && fn && fn()
}

export const readDppForParent = (parentId, fn) => {
    const sql = sql_vl_str.concat('WHERE parent = :parentId').replace(':parentId', parentId)
    executeSelectQuery(sql).then(json => {
        console.log(parentId, json.list)
        addToEMap(json.list)
        addToParentChild(json.list)
        readR1R2(mcd.parentChild[parentId], 'r', fn)
    })
}

export const readMcdIdListStr = uniqueMcdIdList => {
    const sql = sql_vl_str.concat('WHERE doc_id IN (:idList)').replace(':idList', uniqueMcdIdList.join(','))
    // console.log('→', sql)
    return executeSelectQuery(sql)
}

export const readDppFromList = (uniqueMcdIdList, fn) => {
    return readMcdIdListStr(uniqueMcdIdList).then(json => {
        // console.log('← ', json, mcd, fn)
        addToEMap(json.list)
        reView(uniqueMcdIdList)
        readR1R2(uniqueMcdIdList, 'r', fn)
    })
}

const sql_vl_str = 'SELECT doc_id, parent p, reference r, reference2 r2, value vl_str FROM doc \n\
    LEFT JOIN string ON doc_id=string_id \n'

const executeSelectQuery = sql => {
    wsDbRw.ws.send(JSON.stringify({ sql: sql, cmd: 'executeQuery' }))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(JSON.parse(event.data)))
}

wsDbRw.fileFolderList = event => {
    const sql = 'SELECT s.*, sort,parent FROM doc d \n\
        LEFT JOIN (SELECT value vl_str, string_id FROM string) s ON s.string_id = d.doc_id \n\
        LEFT JOIN sort st ON st.sort_id = d.doc_id \n\
        WHERE d.reference = 376600 ' ,
        sql2 = 'SELECT DISTINCT parent , value vl_str FROM ( ' + sql + ') x \n\
        LEFT JOIN string s ON s.string_id=parent' ,
        sendJson = {
            sql: sql + ' ORDER BY parent DESC, sort', cmd: 'executeQuery'
        }
    console.log('→', sql2)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        fileFolder.list = json.list
        ffInteractivity.components.ff.count++
        sendJson.sql = sql2
        wsDbRw.exchangeRwMessage(sendJson).then(event => {
            const json = JSON.parse(event.data)
            console.log('←', json, mcd)
            json.list.forEach(adn => mcd.eMap[adn.parent] = adn)
            ffInteractivity.components.ff.count++
        })
    })
}

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}
