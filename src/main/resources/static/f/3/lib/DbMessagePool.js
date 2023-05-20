'use strict'
import { dbMpView, dbMpData, dbMpFn } from '/f/3/lib/wsDbRw.js'
import { wsDbC } from '/f/3/lib/pd_wsDbC.js'

export default {
    data() { return { countCurrentPool: 0, countDbSaved: 0, count: 0 } },
    mounted() { dbMpView.dbMessagePool = this },
    methods: {
        dbSave() { return dbMpData.dbSave },
        c2p() { return dbMpData.C2P },
        deleteAdn1(deleteAdn1Id) { dbMpFn.deleteAdn1(deleteAdn1Id) },
        save1ParentSort(parentSortId) { dbMpFn.save1ParentSort(parentSortId) },
        save1Update(adnUpdateId) { dbMpFn.save1Update(adnUpdateId) },
        addCountCurrentPool() {
            this.countCurrentPool++
            // console.log(dbMpData)
            dbMpData.dbSave.deleteAdn
                && dbMpData.dbSave.deleteAdn.length > 0
                && dbMpFn.deleteAdn1(dbMpData.dbSave.deleteAdn[0])

            dbMpData.dbSave.sortParentChild
                && dbMpData.dbSave.sortParentChild.length > 0
                && dbMpFn.save1ParentSort(dbMpData.dbSave.sortParentChild[0])

            dbMpData.dbSave.saveContent && Object.keys(dbMpData.dbSave.saveContent)
                .forEach(adnId => dbMpFn.save1Update(adnId))

            // console.log('readNewAdnIds --> ', dbMpData.dbSave.readNewAdnIds)

            dbMpData.dbSave.readNewAdnIds && Object.keys(dbMpData.dbSave.readNewAdnIds)
                .forEach(readNewAdnIds => {
                    const adnIds = readNewAdnIds.includes('_') && readNewAdnIds.split('_') || [readNewAdnIds]
                        , sendJson = Object.assign(dbMpData.dbSave.readNewAdnIds[readNewAdnIds]
                            , wsDbC.jsonToSend('adn01NodesIn', adnIds))
                    console.log('→', sendJson)
                    wsDbC.sendAndSetMessageFn(sendJson).then(event => {
                        const json = JSON.parse(event.data)
                        console.log('←', json)
                    })
                })

        }, isPastePossible() { return dbMpFn.isPastePossible() }
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-tiny w3-opacity">
        <span class="w3-text-blue" v-if="c2p().adnIdCopy"> ⧉ </span> {{c2p().adnIdCopy}}
    </span>&nbsp;<span class="w3-hide">{{count}}</span>
    <span class="w3-tiny w3-opacity w3-hover-shadow w3-card">
        &nbsp; <sub> {{countCurrentPool}} </sub>/<sup>{{countDbSaved}}</sup> ䷢ &nbsp;
    </span>
    <div class="w3-dropdown-content w3-border w3-right-align w3-hover-shadow" style="right: -1em; width: 33em;">
        <span class="w3-tiny w3-opacity w3-left">DB messages &nbsp;</span>
        &nbsp;
        <div class="w3-small" v-if="c2p().adnIdCopy && c2p().siblingPasteAdnId">
            <span class="w3-left w3-red" v-if="!isPastePossible()">
                ⚠ paste no possible
                {{c2p().ppIdpp && c2p().ppIdpp.lrPl2}}
            </span> 
            <span class="w3-text-blue" v-if="c2p().adnIdCopy"> ⧉ </span> copy:{{c2p().adnIdCopy}}
            <span v-if="c2p().siblingPasteAdnId"> ➾ 
                <span class="w3-text-blue" > ⧠ </span> paste:{{c2p().siblingPasteAdnId}}
            </span>
        </div>
        <div v-if="dbSave()">
            <span class="w3-tiny w3-opacity w3-left">toSave</span>
            a1
            {{dbSave()}}
            a1
            <div v-if="dbSave().saveContent">
                saveContent
                <div v-for="( sc, adnUpdateId) in dbSave().saveContent ">
                    <span class="w3-yellow w3-left w3-tiny"> {{sc.status}} </span>
                    {{sc.string}}
                    <button class="w3-btn" @click="save1Update(adnUpdateId)"> {{adnUpdateId}} </button>
                </div>
            </div>
            <div v-if="dbSave().deleteAdn">
{{dbSave().deleteAdn}}
                <button @click="deleteAdn1(deleteAdnId)" class="w3-btn w3-padding-small"
                    v-for="deleteAdnId in dbSave().deleteAdn">
                    {{deleteAdnId}}, </button>
                deleteAdn
            </div>
            <div v-if="dbSave().sortParentChild">
                <button @click="save1ParentSort(parentSortId)" class="w3-btn w3-padding-small"
                    v-for="parentSortId in dbSave().sortParentChild">
                    {{parentSortId}}, </button>
                sortParentChild
            </div>
        </div>
        &nbsp;
    </div>
</span>
`,
}
