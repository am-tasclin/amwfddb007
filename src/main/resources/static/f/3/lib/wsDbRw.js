'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'


//dbMp: db Message Pool
export const
    dbMpView = {}
    , dbMpFn = {}
    , dbMpData = {}

dbMpFn.reviewFhirPart = adnId => {
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].l_fipId
        .filter(fipId => fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[adnId]
        ).forEach(fipId => fipi.ppId[ppId].pp[pp].fipId[fipId]
            .fhirPart[adnId].count++)))
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].ppl2
        && fipi.ppId[ppId].pp[pp].ppl2.l_fipId
            .filter(fipId => fipi.ppId[ppId].pp[pp].ppl2.fipId[fipId].fhirPart[adnId]
            ).forEach(fipId => fipi.ppId[ppId].pp[pp].ppl2.fipId[fipId]
                .fhirPart[adnId].count++)))
}


dbMpFn.deleteAdn1 = deleteAdnId => {
    const sendJson = {
        adnId: deleteAdnId, cmd: 'deleteAdn1'
    }
    console.log('→', deleteAdnId, sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        dbMpFn.reviewFhirPart(json.adnId)
    })
}

dbMpFn.save1ParentSort = parentSortId => {
    const sendJson = {
        adnId: parentSortId, cmd: 'save1ParentSort'
        , l: pd.parentChild[parentSortId]
    }
    console.log('→', sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
    })
}

dbMpFn.save1Update = adnUpdateId => {
    const sendJson = Object.assign(dbMpData.dbSave.update[adnUpdateId]
        , { adnId: adnUpdateId, cmd: 'updateString' })
    console.log('→', sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        pd.eMap[json.adnId].value_22 = json.string
        dbMpFn.reviewFhirPart(json.adnId)
    })
}

dbMpFn.addDbSaveList = (blockName, im) => dbMpFn.getDbSaveList(blockName)
    && !dbMpData.dbSave[blockName].includes(im)
    && dbMpData.dbSave[blockName].push(im)

dbMpFn.getDbSaveList = blockName => dbMpFn.getDbSaveElement([], blockName)
dbMpFn.getDbSaveObject = blockName => dbMpFn.getDbSaveElement({}, blockName)
dbMpFn.getDbSaveElement = (et, blockName) => blockName &&
    (dbMpData.dbSave || (dbMpData.dbSave = {}))
    && dbMpData.dbSave[blockName]
    || (dbMpData.dbSave[blockName] = et) || null

export const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
wsDbRw.ws = new WebSocket(uri_wsDbRw)

