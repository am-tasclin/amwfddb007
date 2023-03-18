'use strict'
import { pd, wsDbC } from '/fip/1/1/l1.js'
import { fipi } from '/fip/1/2/fipi.js'
import FhirPart from '/fip/1/2/FhirPart.js'
import TPageParts from '/twiki/4/TPageParts.js'

!pd.tWiki && (pd.tWiki = {})
!pd.session.ppClose && (pd.session.ppClose = [])

export default {
  props: { wId: Number }, data() { return { count: 1 } },
  mounted() { pd.tWiki[this.wId] = this },
  components: { FhirPart, TPageParts },
  methods: {
    fipList() { return fipi.fipList },
    ppsFipi() { return fipi.ppsFipi },
    fip(fip) { return wsDbC.fip[fip] },
    parentChild(adnId) { return pd.parentChild[adnId] || [] },
    ea(adnId, n) { return pd.eMap[adnId] && pd.eMap[adnId][n] },
    sn() { return pd.session },
    ppClick(pagePart) {
      console.log(pagePart, pd.session)
      !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
          || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
      this.count++
  },
  }, template: `
<span class="w3-hide">{{count}}</span>
<template v-for="adnId in parentChild(wId)">
  <h2 class="w3-border-bottom" v-if="'h2'==ea(adnId, 'r_value_22')">
      {{ea(adnId, 'value_22')}} </h2>
  <span class="w3-right w3-tiny w3-opacity"> <sup v-if="'ORDER'==ea(adnId, 'r_value_22')">
        ORDER </sup> </span>
  <template v-for="adnId2 in parentChild(adnId)">
    <p v-if="'p'==ea(adnId2, 'r_value_22')">
        {{ea(adnId2, 'value_22')}} </p>
    <template v-if="fipList().includes(ea(adnId2, 'reference'))">
      <template v-if="'FIP'==ea(ea(adnId2, 'reference'),'value_22')">
        <TPageParts :adnId="adnId2"/>
      </template>
      <template v-else>
        <template v-for="pp in [ea(ea(adnId2, 'reference'),'value_22')]">
        <div class="w3-container w3-topbar w3-light-grey" >
            <span class="w3-tiny"> {{pp}}: </span>
            <span class="w3-hover-shadow am-u" @click="ppClick(pp)">
                &nbsp; {{fip(pp)}} &nbsp;
            </span>
        </div>
        <div :class="{'w3-hide':sn().ppClose.includes(pp)}">
            <template v-for="adnId3 in ppsFipi()[adnId2].json[pp]">
                <FhirPart :adnId="adnId3"/>
            </template>
        </div>
        </template></template>
    </template>
  </template>
</template>
  ` ,
}
