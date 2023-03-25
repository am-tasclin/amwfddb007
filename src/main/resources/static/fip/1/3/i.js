'use strict'
const { createApp } = Vue
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import TPageParts from '/twiki/4/TPageParts.js'
import FhirPart from '/fip/1/2/FhirPart.js'

fipi.ppsFipi = { 1: fipi }

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

        Object.keys(fipi.ppFips).reduce((o, k) =>
            Object.keys(fipi.ppFips[k].opened).reduce((o2, k2) =>
                Object.keys(fipi.ppFips[k].opened[k2]).reduce((o3, k3) =>
                    fipi.ppFips[k].opened[k2][k3]//.filter(k4 => pd.parentChild[k4])
                        .reduce((o4, k4) => pd.ctAdntree[k4].count++, 0), 0), 0), 0)

        Object.keys(fipi.ppFips).reduce((o, k) =>
            Object.keys(fipi.ppFips[k].pl2).reduce((o2, k2) =>
                Object.keys(fipi.ppFips[k].pl2[k2]).reduce((o3, k3) => {
                    console.log(k, k2, k3, fipi.ppFips[k].pl2[k2][k3])
                    console.log(fipi.ppsFipi[k].pl2[k2][k3].buildJson,
                        fipi.ppFips[k].pl2[k2][k3].buildJsonType.key
                    )
                    console.log(fipi.ppsFipi[k].pl2[k2][k3]
                        .buildJson['build' + fipi.ppFips[k].pl2[k2][k3].buildJsonType.key])
                    fipi.ppsFipi[k].pl2[k2][k3]
                        .buildJson['build' + fipi.ppFips[k].pl2[k2][k3].buildJsonType.key]()
                }, 0), 0), 0)

    },
}]

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)
