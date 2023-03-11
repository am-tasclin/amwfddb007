'use strict'
const { createApp } = Vue
import FhirPart from '/fip/1/2/FhirPart.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import { wsDbC, pd } from '/fip/1/1/l1.js'

console.log(1232, pd)
console.log(fipi, 1231)

const tPageParts = createApp({
    data() { return { pps: fipi.pps, ppm: fipi.json } },
    methods: {
        ppIds(ppName) { return fipi.json[ppName] }
    },
})
tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')

const allAdnIds = fipiFn.getAllAdnIds()
wsDbC.runWsOpenInPromise({ sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') }
).then(event => {
    wsDbC.sqlAdnData(event)
    // .forEach(adnId => pd.ctAdntree[adnId].count++)
    wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAdnIds.join(',')))
})
