'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { dppItyComponent, addDppItyComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

export const dbMessagePool = {}
export const addDbMessageToPool = dbMessage =>
    (dbMessagePool[dbMessage.countCurrentPool = dppItyComponent.dbMessagePool.countCurrentPool
    ] = dbMessage)
    && dppItyComponent.dbMessagePool.countCurrentPool++

export default {
    data() { return { countCurrentPool: 0, countDbSaved: 0, } },
    mounted() {
        addDppItyComponent('dbMessagePool', this)
    }, methods: {
        dbMessagePool() { return dbMessagePool },
        mKeys() { return Okeys(dbMessagePool) },
    }, template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-tiny w3-opacity w3-hover-shadow w3-card">
        &nbsp; <sub> {{countCurrentPool}} </sub>/<sup>{{countDbSaved}}</sup>
        ䷢ &nbsp;
    </span>
    <div class="w3-dropdown-content w3-border w3-right-align w3-hover-shadow" style="right: -1em; width: 33em;">
        {{mKeys()}}
        <div v-for="k in mKeys()" class="w3-hover-shadow">
            <span class="w3-small">
            {{dbMessagePool()[k]}}
            <span>
            :{{k}}
        </div>
    </div>
</span>
`,
}

const Okeys = Object.keys
