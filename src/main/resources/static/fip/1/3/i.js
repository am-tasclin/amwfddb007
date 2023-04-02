'use strict'
const { createApp } = Vue
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import TPageParts from '/twiki/4/TPageParts.js'
import FhirPart from '/fip/1/2/FhirPart.js'

console.log(fipi)
fipi.ppsFipi = { 1: fipi }

fipiFn.initFromURI_TODELETE(window.location.hash.substring(1), fipi)

fipi.pps[0].includes('itjn=') &&
    fipiFn.initFromJson(window.location.hash.substring(1).replace('itjn=', ''), fipi)

fipiFn.initFromJson2(fipi)

const allAdnIds = fipiFn.getAllAdnIds()
console.log(allAdnIds, fipi.l_ppId, fipi.ppId)
allAdnIds &&
    allAdnIds.splice(0, 0, fipi.FhirInfoPageId)

console.log(allAdnIds)

const tPageParts = createApp({
    data() { return { count: 1 } },
})
tPageParts.component('t-page-parts', TPageParts)
tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')

wsDbC.cmdListItem = 0
wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') },
    thenFn: event => {
        // pd.tPageParts && pd.tPageParts[1].count++
        wsDbC.sqlAdnData(event).forEach(adnId => {
            pd.ctAdntree && pd.ctAdntree[adnId] && pd.ctAdntree[adnId].count++
            pd.adnIdMenu && pd.adnIdMenu[adnId] && pd.adnIdMenu[adnId].count++
            pd.eMap[adnId].openChild = false
        })
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4)
            , allAdnIds.join(',')))
    },
}, {
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: () => {
        !fipi.fipList && fipiFn.fipList()
        pd.tPageParts && pd.tPageParts[1].count++

        fipi.l_ppId.filter(ppId => fipi.ppId[ppId].l_pp
            .filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(fipId => {
                fipi.ppId[ppId].pp[pp].fipId[fipId].buildJsonType &&
                    fipi.ppId[ppId].pp[pp].fipId[fipId].buildJsonType.key &&
                    fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson['build'
                        + fipi.ppId[ppId].pp[pp].fipId[fipId].buildJsonType.key]()

                console.log(ppId, pp, fipId, fipi.ppId[ppId].pp[pp].fipId[fipId])
                fipi.ppId[ppId].pp[pp].fipId[fipId].ctAdntree &&
                    fipi.ppId[ppId].pp[pp].fipId[fipId].ctAdntree[fipId].count++
                return true
            })))

    },
}]

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)
