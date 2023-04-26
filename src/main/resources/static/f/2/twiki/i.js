'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/2/lib/fipi.js'
import { wsDbC, pd } from '/f/2/lib/pd_wsDbC.js'

const pageId = window.location.hash.substring(1).split(',')[1]
console.log(pageId)


const tWiki = createApp({
    data() { return { count: 0, pageId: pageId } },
    mounted() {
        fipi.tWiki = this
    },
    methods: {
        e(adnId) { return pd.eMap[adnId] },
        i(adnId,att) { return pd.eMap[adnId] && pd.eMap[adnId][att] },
    },
})
tWiki.mount('#tWiki')

wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', },
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)

        console.log(fipi, 123, pd)
        fipi.tWiki.count++

        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), pageId))

    },
}, {
    thenFn: event => {
        console.log(123, 'wsDbC.cmdList[1] 2')
    }
}]

wsDbC.cmdList[0].sendJson.adnId = [pageId, fipi2.FhirInfoPageId].join(',')
wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)

const headTitle = createApp({ data() { return { pageId: pageId } } })
headTitle.mount('#headTitle')
