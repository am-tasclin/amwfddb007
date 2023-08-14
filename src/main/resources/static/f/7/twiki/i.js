'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds, readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'
import { initDomConfLogic, getHewList, } from '/f/7/libDomGrid/libDomGrid.js'
console.log(123)
initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = getHewList()

ws.onopen = event =>
    uniqueIdsForDbRead.length && readAdnByIds(uniqueIdsForDbRead
    ).then(() => readAdnByParentIds(uniqueIdsForDbRead).then(() => {
        console.log(uniqueIdsForDbRead)
    }))


const { createApp } = Vue
createApp({
    data() { return { count: 0, hewId: 0, } },
    methods: {
        setHewId() {
            console.log(this.hewId)
            window.location.href = '#hew,' + this.hewId
        },
    }
}).mount('#actuallyEdit')