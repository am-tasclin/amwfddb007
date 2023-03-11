'use strict'
const { createApp } = Vue
import { wsDbC, pd }    from '/fip/1/1/l1.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import FhirPart         from '/fip/1/2/FhirPart.js'

console.log(1232, pd)
console.log(fipi, 1231)
pd.session.ppClose = []
const tPageParts = createApp({
    data() { return { pps: fipi.pps, ppm: fipi.json, count: 1 } },
    methods: {
        ppIds(ppName) { return fipi.json[ppName] },
        fip(fip) { return wsDbC.fip[fip] },
        sn() { return pd.session },
        ppClick(pagePart) {
            !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
                || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
            this.count++
        },
    },
})
tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')

const allAdnIds = fipiFn.getAllAdnIds()
wsDbC.runWsOpenInPromise({ sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') }
).then(event => {
    wsDbC.sqlAdnData(event)
        .forEach(adnId => pd.ctAdntree[adnId].count++)
    wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAdnIds.join(',')))
})
