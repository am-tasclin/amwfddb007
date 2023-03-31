'use strict'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import { fipi } from '/fip/1/2/fipi.js'

!fipi.ppFips && (fipi.ppFips = {})
!pd.ppCmdEd && (pd.ppCmdEd = {})

export default {
    props: { ppId: Number }, data() { return { count: 1 } }
    , mounted() {
        pd.ppCmdEd[this.ppId] = this
        this.setPpcvName('JSON')
    }, methods: {
        keys(o) { return Object.keys(o) },
        fip(fip) { return wsDbC.fip[fip] },
        ppIdFn() { return fipi.ppId[this.ppId] },
        ppsFipi() { return fipi.ppsFipi[this.ppId] },
        pps() { return fipi.ppId[this.ppId].l_pp },
        // pps() { return fipi.ppsFipi && fipi.ppsFipi[this.ppId] && fipi.ppsFipi[this.ppId].pps },
        ppCmdEdOnOff() { pd.cmd.W3ShowOnOff('ppCmdEd_' + this.ppId) },
        //ppcv page part cmd view
        ppcvJsonUrlStr() { return JSON.stringify(fipi.ppFips[this.ppId]) },
        ppIdStr() {
            return (fipi.ppId[this.ppId].ppId = this.ppId) &&
                JSON.stringify(fipi.ppId[this.ppId], (k, v) =>
                    !['ctAdntree', 'buildJson'].includes(k) && v || undefined
                )
        },
        ppcvJsonStr() { return ppCmdBuild.ppcvJsonStr(fipi.ppFips[this.ppId]) },
        setPpcvName(im) {

            console.log(this.ppId, im)
            console.log(fipi.ppsFipi[this.ppId])

            'JSON' == im && ppCmdBuild.ppsFipi(this.ppId, fipi.ppFips[this.ppId] || (fipi.ppFips[this.ppId] = {}));
            (fipi.ppsFipi[this.ppId].ppcv = im)
            this.count++
        },
    }, template: `
<span class="w3-dropdown-click">
    <button @click="ppCmdEdOnOff" class="w3-btn w3-ripple w3-padding-small w3-small">
    {{pps().join(',')}} &nbsp;&nbsp;<i class="fa-solid fa-bars"></i>&nbsp;
    </button>
    <div :id="'ppCmdEd_'+ppId" class="w3-dropdown-content w3-container w3-hover-shadow w3-border"
            style="right: -1em; width: 52em;">
            <a :href="'#itjn='+ppcvJsonUrlStr()">{{ppcvJsonUrlStr()}}</a>
            <div><a :href="'#itjn='+ppIdStr()">{{ppIdStr()}}</a></div>
        <div class="w3-row">
            <div class="w3-quarter w13-border-right">
                <div class="w3-tiny w3-border-bottom">
                    <span @click="setPpcvName(ppcv)" 
                        :class="{'w3-grey':ppcv==ppsFipi().ppcv}"
                    v-for="ppcv in ['URI','JSON']" class="w3-hover-shadow am-b">
                        &nbsp; {{ppcv}}, </span>&nbsp;{{ppId}}
                    <div class="w3-right-align w3-opacity w3-container"> 
                        <span class="am-i"> <template 
                            v-if="'JSON'!=ppsFipi().ppcv" >
                                Use for start init only.
                            </template> <template v-else> 
                                Full pagePart Config</template>
                        <span>
                    </div>
                </div>
                a3
                <div class="w3-opacity w3-tiny">
                <div v-if="'JSON'==ppsFipi().ppcv"  style="white-space: pre; overflow: auto;">
                        {{ppcvJsonStr()}}
                    </div>
                    <div v-else>
                    a1
                    <!-- >,&nbsp; {{ppsFipi().json[pp].join(', ')}} -->
                        <div  v-for="pp in pps()" class="w3-hover-shadow">
                            <span class="am-b">{{pp}}</span
                            >,&nbsp; {{ppIdFn().pp[pp].l_fipId.join(', ')}}
                            <div v-for="pl2 in ppsFipi().pl2[pp]">
                                <span class="am-b">pl2_{{pp}}</span
                                >,&nbsp; {{keys(ppsFipi().pl2[pp]).join(', ')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w3-threequarter w13-container w13-border-left">
                <div class="w3-row w3-tiny am-b w3-border-bottom">
                    <div class="w3-half"> pageParts </div> <div class="w3-half"> pane2, right </div>
                </div>
                <div class="w3-row w3-border-bottom" v-for="pp in pps()" class="w3-hover-shadow">
                    <div class="w3-half"> 
                        <span class="w3-opacity a1m-u">
                            {{pp}}: <span class="w3-small am-i"> {{fip(pp)}} </span>
                        </span>
                        <input :value="ppIdFn().pp[pp].l_fipId.join(', ')" class="w3-hover-shadow w3-small" style="width: 100%;">
                        <!--
                        <input :value="ppsFipi().json[pp].join(',')" class="w3-hover-shadow w3-small" style="width: 100%;">
                        -->
                    </div>
                    <div class="w3-half w3-container w3-small">
                        a1
                        <!--
                        <span v-for="k2 in ppsFipi().json[pp]">
                        -->
                        <span v-for="k2 in ppIdFn().pp[pp].l_fipId">
                            <template v-if="'lr'!=pp">
                                {{k2}},
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div> &nbsp;
    </div>
</span> <span class="w3-hide">{{count}}</span>
    `,
}

const ppCmdBuild = {}

ppCmdBuild.ppcvJsonStr = ppFips => JSON.stringify(ppFips, '', 2)
    .replace(/",\s+"/g, '", "')
    .replace(/\[\s+"/g, '["')
    .replace(/"\s+\]/g, '"]')
    .replace(/\s+}/g, '}')

ppCmdBuild.ppsFipi = (ppId, ppFips) => {
    // ppFips.json = fipi.ppsFipi[ppId].json
    // console.log(fipi)

    Object.keys(fipi.ppsFipi[ppId].pl2).reduce((o, pp) =>
        Object.keys(fipi.ppsFipi[ppId].pl2[pp]).reduce((o2, ppId2) =>
            // opened list for pp, ppId from ppAdnOpen
            fipi.ppsFipi[ppId].pl2[pp][ppId2].ppAdnOpen && (() => {
                !fipi.ppsFipi[ppId].opened && (fipi.ppsFipi[ppId].opened = {})
                !fipi.ppsFipi[ppId].opened[pp] && (fipi.ppsFipi[ppId].opened[pp] = {})
                !fipi.ppsFipi[ppId].opened[pp][ppId2] && (fipi.ppsFipi[ppId].opened[pp][ppId2] = [])
                !fipi.ppsFipi[ppId].opened[pp][ppId2].includes(ppId2) &&
                    fipi.ppsFipi[ppId].opened[pp][ppId2].push(ppId2)
                console.log(pp, ppId2, fipi.ppsFipi[ppId].pl2[pp][ppId2])
            })(), 0), 0)

    fipi.ppsFipi[ppId].opened &&
        (ppFips.opened = fipi.ppsFipi[ppId].opened)

    ppFips.pl2 = Object.keys(fipi.ppsFipi[ppId].pl2).reduce((o, pp) => (
        o[pp] = Object.keys(fipi.ppsFipi[ppId].pl2[pp]).reduce((o2, ppId2) => (
            o2[ppId2] = ['buildJsonType'].reduce((o3, k3) => (
                o3[k3] = fipi.ppsFipi[ppId].pl2[pp][ppId2][k3])
                && o3, {}) || {}
        ) && o2, {})
    ) && o, {})
}
