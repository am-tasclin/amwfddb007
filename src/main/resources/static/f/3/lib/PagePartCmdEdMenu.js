'use strict'
import { cl } from '/f/3/lib/common_lib.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

fipiFn.confJson = ppId => JSON.stringify(fipi.ppId[ppId], (k, v) =>
    !['pagePartCmdEdMenu', 'fhirPart', 'adnMenu', 'buildJson'].includes(k)
    && v || undefined)

fipiFn.ppcvJsonStr = ppFips => JSON.stringify(ppFips, '', 2)
    .replace(/",\s+"/g, '", "')
    .replace(/\[\s+"/g, '["')
    .replace(/"\s+\]/g, '"]')
    .replace(/\s+}/g, '}')

export default {
    props: { ppId: Number }, data() { return { count: 0, ppIdStrHash: '', epl2Data: {}, } },
    mounted() {
        // this.ppCmdEdOnOff()
        fipi.ppId[this.ppId].l_pp.filter(pp => 'lr' != pp)
            .reduce((o, pp) => (o[pp] = !fipi.ppId[this.ppId].pp[pp].epl2 && [] ||
                Object.assign([], fipi.ppId[this.ppId].pp[pp].epl2.l_fipId)) && o, this.epl2Data)
    }, methods: {
        pps() { return fipi.ppId[this.ppId].l_pp },
        ppO(pp) { return fipi.ppId[this.ppId].pp[pp] },
        ppIdFn() { return !fipi.ppId && {} || fipi.ppId[this.ppId] },
        fip(fip) { return fipiFn.fip[fip] || '?' },
        ppCmdEdOnOff() { cl.W3ShowOnOff('ppCmdEd_' + this.ppId) },
        ppConfType(ppConfTypeName) {
            fipi.ppId[this.ppId].confType = ppConfTypeName
            console.log(this.ppId, ppConfTypeName, fipi.ppId[this.ppId])
            this.count++
        },
        ppDbId(ppId, pp, ppl2){
            console.log(123, ppId, pp, ppl2)
        },
        confJsonStr(){ return fipiFn.ppcvJsonStr(JSON.parse(fipiFn.confJson(this.ppId)))},
        confJson() {
            fipi.ppId[this.ppId].forPpId = this.ppId
            this.ppIdStrHash = fipiFn.confJson(this.ppId)
        },
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
        {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
        style="right: -1em; width: 52em;">
        <div class="w3-border-bottom"> &nbsp;
            <button class="w3-btn w3-border w3-padding-small w3-white w3-tiny w3-left" @click="confJson">confJson</button>
            <span class="w3-tiny w3-opacity w3-right">{{ppId}}<span>
        </div>
        <div class="w3-tiny ">
        <a :href="'#cj='+ppIdStrHash" target="_blank">{{ppIdStrHash}}</a>
        </div>
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny w3-border-bottom">
                    <div class="w3-right-align w3-opacity w3-container"> 
                        <span class="am-i"> <template 
                            v-if="'JSON'!=ppIdFn().confType" >
                                Use for start init only.
                            </template> <template v-else> 
                                Full pagePart Config. </template>
                        <span>
                    </div>
                    <span @click="ppConfType(ppConfTypeName)"
                    :class="{'w3-grey':ppConfTypeName==ppIdFn().confType}"
                    v-for="ppConfTypeName in ['URI','JSON']" class="w3-hover-shadow am-b">
                        &nbsp; {{ppConfTypeName}}, </span>&nbsp;{{ppId}}
                </div>
                <div v-if="'JSON'==ppIdFn().confType" class="w3-opacity w3-tiny"
                        style="white-space: pre; overflow: auto;" >
                    {{confJsonStr()}}
                </div>
                <template v-else>
                <div v-for="pp in pps()" class="w3-hover-shadow w3-opacity w3-small">
                    <b> {{pp}}</b>, {{ppO(pp).l_fipId.join(', ')}};
                    <span v-if="ppO(pp).ppl2"><span class="am-b">{{pp}}_ppl2</span>,
                        {{ppO(pp).ppl2.l_fipId.join(', ')}};</span>
                    <span v-if="ppO(pp).epl2"><span class="am-b">{{pp}}_epl2</span>,
                        {{ppO(pp).epl2.l_fipId.join(', ')}};</span>
                </div>
                </template>
            </div>
            <div class="w3-threequarter w3-container w13-border-left">
                <div class="w3-row w3-tiny am-b w3-border-bottom">
                    <div class="w3-half"> pageParts </div> 
                    <div class="w3-half w3-container"> pane2, right </div>
                </div>
                <div class="w3-row w3-border-bottom" v-for="pp in pps()" class="w3-hover-shadow">
                    <div class="w3-half">
                        <span class="w3-opacity a1m-u">
                            {{pp}}: <span class="w3-small am-i"> {{fip(pp)}} </span>
                        </span>
                        <input @keyup.enter="ppDbId(ppId, pp)" :value="ppO(pp).l_fipId.join(', ')" class="w3-hover-shadow w3-small am-width-100pr">
                    </div>
                    <div class="w3-half w3-container">
                        <div v-if="'lr'==pp"> <span class="w3-opacity a1m-u"> &nbsp; </span>
                            <input @keyup.enter="ppDbId(ppId, pp, true)" :value="ppO(pp).ppl2.l_fipId.join(', ')" class="w3-hover-shadow w3-small am-width-100pr"/>
                        </div>
                        <span v-for="k2 in ppIdFn().pp[pp].l_fipId" class="w3-small">
                            <template v-if="'lr'!=pp">
                                <label><input v-model="epl2Data[pp]"
                                type="checkbox" :value="k2"/>&nbsp;{{k2}}</label>,
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        &nbsp;
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}
