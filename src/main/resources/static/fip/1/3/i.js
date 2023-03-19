'use strict'
const { createApp } = Vue
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import TPageParts from '/twiki/4/TPageParts.js'
import FhirPart from '/fip/1/2/FhirPart.js'

fipi.ppsFipi = { 1: fipi }
console.log(fipi)

const allAdnIds = fipiFn.getAllAdnIds()
allAdnIds.push(fipi.FhirInfoPageId)

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
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAdnIds.join(',')))
    },
}, {
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: () => {
        !fipi.fipList && fipiFn.fipList()
        pd.tPageParts && pd.tPageParts[1].count++
    },
}]

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)
