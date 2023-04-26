'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/2/lib/fipi.js'
import { wsDbC, pd } from '/f/2/lib/pd_wsDbC.js'
import TWiki from '/f/2/twiki/TWiki.js'

const pageId = window.location.hash.substring(1).split(',')[1]

const tWiki = createApp({
    data() { return { count: 0, pageId: pageId } },
    mounted() {
        fipi.tWikiPage = this
    },
    methods: {
        e(adnId) { return pd.eMap[adnId] },
        ea(adnId, att) { return pd.eMap[adnId] && pd.eMap[adnId][att] },
    },
})
tWiki.component('t-wiki', TWiki)
tWiki.mount('#tWiki')

wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', },
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)
        fipi.tWikiPage.count++

        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), wsDbC.cmdList[0].sendJson.adnId))

    },
}, {
    thenFn: event => {
        fipi.tWikiPart.count++
        dg.pd = pd
        dg.FhirInfoPageId = fipi2.FhirInfoPageId
        console.log(fipi, 123, pd, fipi2.FhirInfoPageId)
        fipi.fipList = fipiFn.childIdConcat(fipi2.FhirInfoPageId, [])
        // fipiFn.childIdList([fipi2.FhirInfoPageId])
        console.log(fipi.fipList)

    }
}]; wsDbC.cmdListItem = 0

wsDbC.cmdList[0].sendJson.adnId = [pageId, fipi2.FhirInfoPageId].join(',')
wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)

createApp({ data() { return { pageId: pageId } } }).mount('#headTitle')
