'use strict'
import { wsDbRw, dbMpView, dbMpData, dbMpFn } from '/f/3/lib/wsDbRw.js'

export default {
    data() { return { countCurrentPool: 0, countDbSaved: 0 } },
    mounted() { dbMpView.dbMessagePool = this },
    methods: {
        dbSave() { return dbMpData.dbSave },
        save1ParentSort(parentSortId) { dbMpFn.save1ParentSort(parentSortId) }
        , addCountCurrentPool() {
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
