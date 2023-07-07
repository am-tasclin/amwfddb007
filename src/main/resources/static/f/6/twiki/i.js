'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const { createApp } = Vue
const pageId = window.location.hash.substring(1).split(',')[1]
console.log(pageId)

import TWiki from '/f/6/libTWiki/TWiki.js'
createApp({
    data() { return { count: 0, pageId: pageId } },
    template: `<TWiki :pageId="pageId"/>`, components: { TWiki },
}).mount('#tWiki')

import { ws, readDocAndParentList } from '/f/6/lib/wsDbRw.js'
import { meMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { mcd } from '/f/6/lib/MetaContentData.js'
ws.onopen = event => pageId && readDocAndParentList(
    { doc_id: [pageId], parent: [pageId] }, () => {
        meMap[pageId].tWiki.count++
        readDocAndParentList({ doc_id: [], parent: mcd.parentChild[pageId] }, () => {
            console.log(mcd, mcd.parentChild[pageId])
            meMap[pageId].tWiki.count++
        })
    })

