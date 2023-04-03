'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/2/lib/fipi.js'
import { wsDbC } from '/f/2/lib/pd_wsDbC.js'
import TPageParts from '/f/2/lib/TPageParts.js'
import FhirPart from '/f/2/lib/FhirPart.js'

fipiFn.initPageParts(window.location.hash.substring(1), 1)

console.log(fipi)

const allAdnIds = fipiFn.getAllAdnIds()
allAdnIds && allAdnIds.splice(0, 0, fipi2.FhirInfoPageId)

const tPageParts = createApp({
    data() { return { count: 0 } },
})
tPageParts.component('t-page-parts', TPageParts)
tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')

fipi2.initPP_AfterRead = () => fipi2.fipId.find(adnId => fipi.l_ppId.find(ppId =>
    fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].l_fipId
        .find(fipId => Object.keys(fipi.ppId[ppId].pp[pp].fipId[fipId]
            .fhirPart).filter(fpId => fpId == adnId).find(fpId => {
                fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[fpId].count++
                fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson &&
                    fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson.count++
            })))))

wsDbC.cmdListItem = 0
wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') },
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)
        fipi2.initPP_AfterRead()

        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4)
            , allAdnIds.join(',')))

    },
}, {
    thenFn: event => {
        console.log(123, 'wsDbC.cmdList[1] 2')
        fipi2.initPP_AfterRead()
    }
}]

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson)
    .then(wsDbC.cmdList[0].thenFn)
