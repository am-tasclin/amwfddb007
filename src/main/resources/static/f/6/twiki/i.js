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

import { ws, readDppFromList, readOpenedParent } from '/f/6/lib/wsDbRw.js'
import { readDocAndParentList } from '/f/6/lib/wsDbRw.js'
import { meMap } from '/f/6/libTGridDpp/dppInteractivity.js'
ws.onopen = event => pageId && (() => {
    readDppFromList([pageId], () => {
        console.log('Hi tWiki World!', event)
        meMap[pageId].tWiki.count++
    })
    readDocAndParentList({ d: [pageId], p: [pageId] }, () => {
        console.log(123)
    })
})()

