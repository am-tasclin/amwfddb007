'use strict'
import { pd } from '/fip/1/1/l1.js'
export default {
    props: { adnId: Number, pp: String }, data() { return { count: 1, } },
    mounted() {
        pd.panel2Conf(this.adnId, this.pp).buildJsonComponent = this
    }, template: `
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        <button v-for="im in ['buildJSON','buildSQL']"
            class="w3-btn" @click="buildType(im)">{{im}}</button>
    </div> <span class="w3-hide"> {{count}} </span>
</span>
<span class="w3-small">
    <button @click="buildStructure" class="w3-btn w3-padding-small am-u">Structure</button>
</span>
<div v-if="isOpenChild(adnId)" style="white-space: pre; overflow: auto;"
    class="w3-opacity w3-small w3-border-top">
    {{jsonStr()}}
</div>
    `,
    methods: {
        buildType(im) { pd.buildPanel2ConfType(im, this.adnId, this.pp) },
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        jsonStr() {
            return pd.panel2Conf(this.adnId, this.pp).buildJson
                && pd.panel2Conf(this.adnId, this.pp).buildJson.jsonStr
        },
        panel2Conf() { return pd.panel2Conf(this.adnId, this.pp) },
        buildStructure() {
            pd.panel2Conf(this.adnId, this.pp).buildJson &&
                delete pd.panel2Conf(this.adnId, this.pp).buildJson
            pd.panel2Conf(this.adnId, this.pp).buildJson
                = { json: buildJSON.typeOf.Structure(this.adnId, {}) }
            pd.panel2Conf(this.adnId, this.pp).buildJson.jsonStr
                = buildJSON.stringify.Structure(
                    pd.panel2Conf(this.adnId, this.pp).buildJson.json)
            this.count++
        },
    },
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

    pd.eMap[eId].doctype && (jn[kName] = pd.eMap[eId].doctype + ' ::_dataType_')

    doctype == 37 && (jn[kName] = [{}])
    pd.parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    jn[kName] &&
        pd.parentChild[eId] && buildJSON.typeOf.se2Parent(e, eId)
    !jn[kName] && (jn[kName] = '')
})
