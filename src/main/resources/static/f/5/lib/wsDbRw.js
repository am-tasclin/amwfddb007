'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { mcd } from '/f/5/lib/MetaContentData.js'
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

const sql_vl_str = 'SELECT doc_id, parent p, reference r, reference2 r2, value vl_str FROM doc \n\
    LEFT JOIN string ON doc_id=string_id \n\
    WHERE doc_id IN (:idList)'

export const readMcdIdStr = (event, uniqueMcdIdList) => {
    const sql = sql_vl_str.replace(':idList', uniqueMcdIdList.join(','))
        , sendJson = { sql: sql, cmd: 'executeQuery' }
    // console.log('→', sql)
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
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
