'use strict'
const { createApp } = Vue
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipi, fipiFn } from '/fip/1/2/fipi.js'
import PagePartCmdEdMenu from '/fip/1/2/PagePartCmdEdMenu.js'
import FhirPart from '/fip/1/2/FhirPart.js'

console.log(fipi, pd)

pd.session.ppClose = []
const ppSort = createApp({
    data() { return { count: 1 } },
    methods: {
        fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppsHref(pp) {
            fipi.pps = pd.cmd.listEltoFirst(fipi, 'pps', pp)
            this.count++; pd.tPageParts.count++; pd.ppCmdEd.count++
        },
    }
})
ppSort.component('t-pp-cmd-ed-menu', PagePartCmdEdMenu)
ppSort.mount('#ppSort')

const tPageParts = createApp({
    data() { return { ppm: fipi.json, count: 1 } },
    mounted() { pd.tPageParts = this },
    methods: {
        ppIds(ppName) { return fipi.json[ppName] },
        sn() { return pd.session }, fipi() { return fipi }, fip(fip) { return wsDbC.fip[fip] },
        ppIdsClick(pagePart, ppId) {
            console.log(pagePart, ppId, fipi.json[pagePart])
            fipi.json[pagePart] = pd.cmd.listEltoFirst(fipi.json, pagePart, ppId)
            this.count++; pd.ppCmdEd.count++;

        },
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
    const idS = wsDbC.sqlAdnData(event)
    idS.forEach(adnId => pd.eMap[adnId].openChild = false)
    idS.forEach(adnId => pd.ctAdntree[adnId].count++)
    wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAdnIds.join(',')))
})
