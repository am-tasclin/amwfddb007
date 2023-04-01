'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/2/lib/fipi.js'
import { pd, wsDbC } from '/f/2/lib/pd_wsDbC.js'
import TPageParts from '/f/2/lib/TPageParts.js'

console.log(wsDbC)
fipiFn.initPageParts(window.location.hash.substring(1), 1)

console.log(fipi)

const allAdnIds = fipiFn.getAllAdnIds()
allAdnIds && allAdnIds.splice(0, 0, fipi2.FhirInfoPageId)


const tPageParts = createApp({
    data() { return { count: 1 } },
})
tPageParts.component('t-page-parts', TPageParts)
tPageParts.mount('#tPageParts')

wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') },
    thenFn: event => {
        console.log(
            wsDbC.sqlAdnData(event),
            pd.eMap,
            pd.parentChild
        )
    },
}, {}]

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson)
    .then(wsDbC.cmdList[0].thenFn)
