'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'


//dbMp: db Message Pool
export const
    dbMpView = {}
    , dbMpFn = {}
    , dbMpData = {C2P:{},}

dbMpFn.reviewFhirPart = adnId => {
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].l_fipId
        .filter(fipId => fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[adnId]
        ).forEach(fipId => fipi.ppId[ppId].pp[pp].fipId[fipId]
            .fhirPart[adnId].count++)))
    // for ppl2
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].ppl2
        && fipi.ppId[ppId].pp[pp].ppl2.l_fipId
            .filter(fipId => fipi.ppId[ppId].pp[pp].ppl2.fipId[fipId].fhirPart[adnId]
            ).forEach(fipId => fipi.ppId[ppId].pp[pp].ppl2.fipId[fipId]
                .fhirPart[adnId].count++)))
}

dbMpFn.insertAdnChild = parent => {
    console.log(parent)
    const sendJson = {
        parent: parent, cmd: 'insertAdnChild'
    }
    console.log('→', parent, sendJson)
    console.log('→', pd.eMap[parent])
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        pd.eMap[json.d.doc_id] = json.d;
        (pd.parentChild[parent] || (pd.parentChild[parent] = []))
            .push(json.d.doc_id)
        console.log('←', pd.parentChild[parent])
        // dbMpFn.reviewFhirPart(json.adnId)
        dbMpFn.reviewFhirPart(json.parent)
    })
}

dbMpFn.deleteAdn1 = deleteAdnId => {
    const sendJson = {
        adnId: deleteAdnId, cmd: 'deleteAdn1'
    }
    console.log('→', deleteAdnId, sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
            , parentId = pd.eMap[json.adnId].parent
            , deleteAdnIdIndex = pd.parentChild[parentId].indexOf(json.adnId)
            , deleteAdnIdIndexDbSave
                = dbMpData.dbSave.deleteAdn.indexOf(deleteAdnId)
        console.log('←', json, parentId)
        pd.parentChild[parentId].splice(deleteAdnIdIndex, 1)
        delete pd.eMap[json.adnId]
        dbMpData.dbSave.deleteAdn.splice(deleteAdnIdIndexDbSave, 1)
        dbMpFn.reviewFhirPart(parentId)
    })
}

dbMpFn.save1ParentSort = parentSortId => {
    const insertList = pd.parentChild[parentSortId]
        .filter(adnId => !pd.eMap[adnId].sort)
        .reduce((insertList, adnId) =>
            insertList.push(adnId) && insertList, [])
    const sendJson = {
        adnId: parentSortId, cmd: 'save1ParentSort'
        , l: pd.parentChild[parentSortId]
        , insertList: insertList
    }
    console.log('→', sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json, dbMpData.dbSave.sortParentChild)

        const parentIndex = dbMpData.dbSave.sortParentChild.indexOf(parent)
        dbMpData.dbSave.sortParentChild.splice(parentIndex, 1)
        dbMpView.dbMessagePool.countCurrentPool--
        dbMpView.dbMessagePool.countDbSaved++
        dbMpData.dbSave.sortParentChild.length > 0
            && dbMpView.dbMessagePool.addCountCurrentPool()

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

