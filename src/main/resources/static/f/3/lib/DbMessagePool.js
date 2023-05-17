'use strict'
import { wsDbRw, dbMpView, dbMpData, dbMpFn } from '/f/3/lib/wsDbRw.js'

export default {
    data() { return { countCurrentPool: 0, countDbSaved: 0 } },
    mounted() { dbMpView.dbMessagePool = this },
    methods: {
        dbSave() { return dbMpData.dbSave },
        deleteAdn1(deleteAdn1Id) { dbMpFn.deleteAdn1(deleteAdn1Id) },
        save1ParentSort(parentSortId) { dbMpFn.save1ParentSort(parentSortId) },
        save1Update(adnUpdateId) { dbMpFn.save1Update(adnUpdateId) },
        addCountCurrentPool() {
            this.countCurrentPool++
            console.log(dbMpData)
        },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-tiny w3-opacity w3-hover-shadow w3-card">
        &nbsp; <sub> {{countCurrentPool}} </sub>/<sup>{{countDbSaved}}</sup> ䷢ &nbsp;
    </span>
    <div class="w3-dropdown-content w3-border w3-right-align w3-hover-shadow" style="right: -1em; width: 33em;">
        <span class="w3-tiny w3-opacity w3-left">DB messages &nbsp;</span>
        &nbsp;
        <div v-if="dbSave()">
            <span class="w3-tiny w3-opacity w3-left">toSave</span>
            <div v-if="dbSave().update">
                update
                <div v-for="( update, adnUpdateId) in dbSave().update ">
                    <span class="w3-yellow w3-left w3-tiny"> {{update.status}} </span>
                    {{update.string}}
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