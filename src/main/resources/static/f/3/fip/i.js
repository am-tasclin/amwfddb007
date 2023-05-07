'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/3/lib/fipi.js'
import { wsDbC, pd } from '/f/3/lib/pd_wsDbC.js'
import TPageParts from '/f/3/lib/TPageParts.js'
import FhirPart from '/f/3/lib/FhirPart.js'

fipiFn.initPageParts(window.location.hash.substring(1), 1)
const allAdnIds = fipiFn.getAllAdnIds()

console.log(fipi, allAdnIds)

wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', adnId: allAdnIds.join(',') },
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)

        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4)
            , allAdnIds.join(',')))

    },
}, {
    thenFn: event => {
        console.log(123, 'wsDbC.cmdList[1] 2', pd.eMap)
        fipi2.viewAdnAfterRead()
    }
}]; wsDbC.cmdListItem = 0

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson)
    .then(wsDbC.cmdList[0].thenFn)


const tPageParts = createApp({ data() { return { count: 0 } }, })
tPageParts.component('t-page-parts', TPageParts)
tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')

fipiFn.headTitleApp(createApp)
