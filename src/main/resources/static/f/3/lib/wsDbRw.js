'use strict'
import { pd, wsDbC } from '/f/3/lib/pd_wsDbC.js'
import { fipi } from '/f/3/lib/fipi.js'

//dbMp: db Message Pool
export const
    dbMpView = {}
    , dbMpFn = {}
    , dbMpData = { C2P: {}, dbSave: {} }

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

dbMpFn.isPastePossible = () => {
    const ppO = (dbMpData.C2P.lrPl2
        && dbMpData.C2P.ppIdpp.ppl2 || dbMpData.C2P.ppIdpp)
    return dbMpData.C2P.ppIdpp && !ppO.l_fipId.includes(dbMpData.C2P.siblingPasteAdnId)
}

dbMpFn.pasteAdnSibling = (siblingPasteAdnId, ppIdpp, lrPl2) => {
    dbMpData.C2P.siblingPasteAdnId = siblingPasteAdnId
    dbMpData.C2P.ppIdpp = ppIdpp
    dbMpData.C2P.lrPl2 = lrPl2
    console.log(dbMpData.C2P)
    console.log(dbMpFn.isPastePossible())
    dbMpView.dbMessagePool.count++
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

dbMpFn.readNewAdnIds = () => Object.keys(dbMpData.dbSave.readNewAdnIds)
    .forEach(readNewAdnIds => {
        const sendJson = Object.assign(dbMpData.dbSave.readNewAdnIds[readNewAdnIds]
            , wsDbC.jsonToSend('adn01NodesIn'
                , readNewAdnIds.includes('_') && readNewAdnIds.split('_')
                || [readNewAdnIds])
        )
        console.log('→', JSON
            .stringify(sendJson, (k, v) => !['sql'].includes(k) && v || undefined))
        wsDbC.sendAndSetMessageFn(sendJson).then(event => {
            const json = JSON.parse(event.data)
            console.log('←', json.ppId, json)
            json.list.forEach(adn => pd.eMap[adn.doc_id] = adn)
            const ppIdPp = json.ppl2 && fipi.ppId[json.ppId].pp[json.pp].ppl2
                || fipi.ppId[json.ppId].pp[json.pp]
            json.adnId.forEach(adnId => ppIdPp.l_fipId.push(adnId)
                && (ppIdPp.fipId[adnId] = {}))
            fipi.ppId[json.ppId].tPagePart.count++
        })
    })

dbMpFn.save1Update = adnUpdateId => {
    const sendJson = Object.assign(dbMpData.dbSave.saveContent[adnUpdateId]
        , { adnId: adnUpdateId, cmd: 'updateString' })
    !pd.eMap[adnUpdateId].value_22 && (sendJson.cmd = 'insertString')
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
// (dbMpData.dbSave || (dbMpData.dbSave = {}))    && 
dbMpFn.getDbSaveElement = (et, blockName) => blockName
    && dbMpData.dbSave[blockName]
    || (dbMpData.dbSave[blockName] = et) || null

export const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}

wsDbRw.ffl = event => {
    const sql = 'SELECT s.*, sort,parent FROM doc d \n\
    LEFT JOIN (SELECT value value_22, string_id FROM string) s ON s.string_id = d.doc_id \n\
    LEFT JOIN sort st ON st.sort_id = d.doc_id \n\
    WHERE d.reference = 376600 '
        , sql2 = 'SELECT DISTINCT parent , value FROM ( ' + sql + ') x \n\
    LEFT JOIN string s ON s.string_id=parent'
    console.log('→', sql)
    // console.log('→', sql2)
    const sendJson = {
        sql: sql + ' ORDER BY parent DESC, sort', cmd: 'executeQuery'
    }
    // console.log('→', sendJson)
    wsDbRw.exchangeRwMessage(sendJson).then(event => {
        const json = JSON.parse(event.data)
        console.log('←', json)
        dbMpData.list = json.list
        dbMpView.ff.count++
        sendJson.sql = sql2
        wsDbRw.exchangeRwMessage(sendJson).then(event => {
            const json = JSON.parse(event.data)

            console.log('←', json)
            dbMpData.eMap = {}
            json.list.forEach(adn => {
                dbMpData.eMap[adn.parent] = adn
            })
            dbMpView.ff.count++
        })
    })
}

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
wsDbRw.ws = new WebSocket(uri_wsDbRw)
