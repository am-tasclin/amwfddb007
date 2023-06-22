'use strict'
export const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java
const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
wsDbRw.ws = new WebSocket(uri_wsDbRw)

export const Okeys = Object.keys
export const fileFolder = {}
const ffInteractivity = { components: {} }
export const
    setFfInteractivityComponent = (n, ct) =>
        ffInteractivity.components[n] = ct,
    getFfInteractivityComponent = n =>
        ffInteractivity.components[n]

wsDbRw.fileFolderList = event => {
    const sql = 'SELECT s.*, sort,parent FROM doc d \n\
        LEFT JOIN (SELECT value vl_str, string_id FROM string) s ON s.string_id = d.doc_id \n\
        LEFT JOIN sort st ON st.sort_id = d.doc_id \n\
        WHERE d.reference = 376600 ' ,
        sql2 = 'SELECT DISTINCT parent , value FROM ( ' + sql + ') x \n\
        LEFT JOIN string s ON s.string_id=parent' ,
        sendJson = {
            sql: sql + ' ORDER BY parent DESC, sort', cmd: 'executeQuery'
        }
    console.log('→', sql)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        fileFolder.list = json.list
        ffInteractivity.components.ff.count++
    })
}

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}
