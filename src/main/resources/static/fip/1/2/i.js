'use strict'
const { createApp } = Vue
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import FhirPart from '/fip/1/2/FhirPart.js'
console.log(fipi, pd)

pd.session.ppClose = []
const ppSort = createApp({
    data() { return { count: 1 } },
    methods: {
        fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppsHref(pp) {
            const firstEl = fipi.pps.splice(fipi.pps.indexOf(pp), 1)
            fipi.pps = firstEl.concat(fipi.pps)
            this.count++; pd.tPageParts.count++
            console.log(fipi.pps, pd.tPageParts, pd.tPageParts.count)
        },
    }
}).mount('#ppSort')

const tPageParts = createApp({
    data() { return { ppm: fipi.json, count: 1 } },
    mounted() { pd.tPageParts = this },
    methods: {
        ppIds(ppName) { return fipi.json[ppName] },
        fip(fip) { return wsDbC.fip[fip] },
        fipi() { return fipi }, 
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
