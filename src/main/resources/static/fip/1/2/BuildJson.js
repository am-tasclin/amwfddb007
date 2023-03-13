'use strict'
import { pd } from '/fip/1/1/l1.js'
!pd.session.buildJson &&
    (pd.session.buildJson = {})
export default {
    props: { adnId: Number, pp: String }, data() { return { count: 1, } },
    mounted() {
        !pd.outForm && (pd.outForm = {})
        !pd.outForm[this.adnId] && (pd.outForm[this.adnId] = {})
        pd.outForm[this.adnId][this.pp] = this
    },
    methods: {
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        jsonStr(adnId, pp) {
            return pd.session.buildJson && pd.session.buildJson[adnId] &&
                pd.session.buildJson[adnId].jsonStr
        },
        buildStructure() {
            !pd.session.buildJson[this.adnId] &&
                (pd.session.buildJson[this.adnId] = {})
            pd.session.buildJson[this.adnId].json &&
                delete pd.session.buildJson[this.adnId].json
            pd.session.buildJson[this.adnId].jsonStr &&
                delete pd.session.buildJson[this.adnId].jsonStr

            pd.session.buildJson[this.adnId].json
                = buildJSON.typeOf.Structure(this.adnId, {})
            pd.session.buildJson[this.adnId].jsonStr
                = buildJSON.stringify.Structure(
                    pd.session.buildJson[this.adnId].json)
            this.count++
        },
    }, template: `
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        buildJson - {{pp}} - {{adnId}}
    </div> <span class="w3-hide"> {{count}} </span>
</span>
<span class="w3-small">
    <button @click="buildStructure" class="w3-btn w3-padding-small am-u">Structure</button>
</span>
<div v-if="isOpenChild(adnId)" style="white-space: pre; overflow: auto;"
    class="w3-opacity w3-small w3-border-top">
    {{jsonStr(adnId, pp)}}
</div>
`,
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
buildJSON.typeOf.keyIsObjName = i => pd.eMap[i].value_22 || pd.eMap[i].r_value_22
buildJSON.typeOf.se2Parent = (jn, pId) => pd.parentChild[pId].forEach(eId => {
    const kName = buildJSON.typeOf.keyIsObjName(eId)
        , doctype = pd.eMap[eId].doctype || pd.eMap[eId].r_doctype

    jn[kName] = ''
    pd.eMap[eId].doctype && (jn[kName] = pd.eMap[eId].doctype + ' ::_dataType_')

    doctype == 37 && (jn[kName] = [{}])
    pd.parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    pd.parentChild[eId] && buildJSON.typeOf.se2Parent(e, eId)
})