'use strict'
import { pd } from '/f/2/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/2/lib/fipi.js'

export default {
    props: { ppId: Number, fip: String, fipId: Number },
    data() { return { count: 0, } },
    mounted() {
        fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].buildJson = this
    }, methods: {
        isOpenChild() {
            return fipiFn.isOpenChild(this.fipId, this.ppId, this.fip, this.fipId)
        },
        buildJsonStr() {
            const json = buildJSON.typeOf.Structure(this.fipId, {})
            const jsonStr = buildJSON.stringify.Structure(json)
            return jsonStr
        }, buildStructure() {
            console.log(123, fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId])
            fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId]
                .buildJsonType.fnName = 'buildStructure'
            this.count++
        },
    }, template: `
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        <button v-for="im in ['buildJSON','buildSQL']" class="w3-btn"
            >{{im}}</button>
    </div>
</span> <span class="w3-hide"> {{count}} </span>
<span class="w3-small">
    <button @click="buildStructure" class="w3-btn w3-padding-small am-u">Structure</button>
</span>
<div v-if="isOpenChild()" style="white-space: pre; overflow: auto;" class="w3-opacity w3-small w3-border-top">
    {{buildJsonStr()}}
</div>
` ,
}

const buildJSON = { typeOf: {}, stringify: {} }

buildJSON.stringify.Structure = json => JSON.stringify(json, (k, v) => (
    'mc' == k && JSON.stringify(v)) || v, 2)
    .replace(/\s+}/g, '}')
    .replace(/mc":\s"{/g, 'mc":{').replace(/{\s+"mc":/g, '{"mc":')
    .replace(/}"}/g, '}}').replace(/}",/g, '},').replace(/\\"/g, '"')
    .replace(/\[\s+{/g, '[{').replace(/}\s+]/g, '}]')

buildJSON.typeOf.Structure = (adnId, json) => {
    json.keyIsObjName = buildJSON.typeOf.keyIsObjName(adnId)
    json.typeJson = 'FHIR.Structure'
    buildJSON.typeOf.se2Parent(json[json.keyIsObjName] = {}, adnId)
    return json
}

buildJSON.typeOf.keyIsObjName = i => pd.eMap[i] && (pd.eMap[i].value_22 || pd.eMap[i].r_value_22)
buildJSON.typeOf.se2Parent = (jn, pId) => pd.parentChild[pId] && pd.parentChild[pId].forEach(eId => {
    const kName = buildJSON.typeOf.keyIsObjName(eId)
        , doctype = pd.eMap[eId].doctype || pd.eMap[eId].r_doctype

    pd.eMap[eId].doctype && (jn[kName] = pd.eMap[eId].doctype + ' ::_dataType_')

    doctype == 37 && (jn[kName] = [{}])
    pd.parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    jn[kName] &&
        pd.parentChild[eId] && buildJSON.typeOf.se2Parent(e, eId)
    !jn[kName] && (jn[kName] = '')
})
