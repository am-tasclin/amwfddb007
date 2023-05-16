'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'

//dbMp: db Message Pool
export const
    dbMpView = {}
    , dbMpFn = {}
    , dbMpData = {}

dbMpFn.save1ParentSort = parentSortId => {
    const sendJson = {
        adnId: parentSortId, cmd: 'save1ParentSort'
        , l: pd.parentChild[parentSortId]
    }
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log(json)
    })
    console.log(sendJson)
}

dbMpFn.getDbSaveList = blockName => {
    !dbMpData.dbSave && (dbMpData.dbSave = {})
    return blockName && dbMpData.dbSave[blockName]
        || (dbMpData.dbSave[blockName] = []) || null
}

export const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
wsDbRw.ws = new WebSocket(uri_wsDbRw)
