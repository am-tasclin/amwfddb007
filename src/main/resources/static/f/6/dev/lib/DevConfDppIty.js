'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta data modeler
 * Dpp -- DOM Page Part
 * 
 */
import { minSpaceJson } from '/f/6/lib/algoritmed-commons.js'
import { confDpp } from '/f/6/lib/confDomPagePart.js'
import { addDppItyComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    data() { return { count: 0, } },
    methods: {
        devText() { return minSpaceJson(confDpp) },
        dppItyCtViewJson() { return minSpaceJson(dppItyCtViewJson()) },
    },
    mounted() {
        addDppItyComponent('dev', this)
        this.count++
    },
    template: `
<p> 🚧:&nbsp; <span class="w3-small w3-opacity">dev cDppIty </span> </p>
<div class="w3-opacity w3-tiny w3-row" style="white-space: pre-wrap; overflow: auto;">
    <div class="w3-half">
        <div class="am-b w3-light-grey">DEV:: dppConf </div>
        {{devText()}}
    </div>
    <div class="w3-half">
        <div class="am-b w3-light-grey w3-border-left"> dppInteractivity
            <span class="w3-right">{{count}}</span>
        </div>
        {{dppItyCtViewJson()}}
    </div>
</div> <span class="w3-hide"> {{count}} </span>
`,
}

import { dppItyComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

export const dppItyCtViewJson = () => {
    const cvj = {}// Component View JSON

    cvj.l_appComponents = Okeys(dppItyComponent)

    Okeys(dppItyComponent.meMap).reduce((cvjMeMap, mcdId) => (
        cvjMeMap[mcdId] = Okeys(dppItyComponent.meMap[mcdId])
    ) && cvjMeMap, cvj.meMap = {})

    dppItyComponent.ppId && Okeys(dppItyComponent.ppId).reduce((cvjPpId, ppId) => {
        cvjPpId[ppId] = {}
        cvjPpId[ppId].l = Okeys(dppItyComponent.ppId[ppId])
        dppItyComponent.ppId[ppId].sortMcData &&
            (cvjPpId[ppId].l_sortMCData = Okeys(dppItyComponent.ppId[ppId].sortMcData))
        return cvjPpId
    }, cvj.ppId = {})
    return cvj
}

const Okeys = Object.keys
