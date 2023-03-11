'use strict'
import { pd } from '/fip/1/1/l1.js'
import FhirPart from '/fip/1/2/FhirPart.js'
!pd.tWik && (pd.tWiki = {})
export default {
  props: { wId: Number }, data() { return { count: 1 } },
  mounted() { pd.tWiki[this.wId] = this },
  components: { FhirPart },
  methods: {
    parentChild(adnId) { return pd.parentChild[adnId] || [] },
    ea(adnId, n) { return pd.eMap[adnId] && pd.eMap[adnId][n] },
  },
  template: `
<span class="w3-hide">{{count}}</span>
<template v-for="adnId in parentChild(wId)">
  <h2 class="w3-border-bottom" v-if="'h2'==ea(adnId, 'r_value_22')">
      {{ea(adnId, 'value_22')}} </h2>
  <span class="w3-right w3-tiny w3-opacity"> <sup v-if="'ORDER'==ea(adnId, 'r_value_22')">
        ORDER </sup> </span>
  <template v-for="adnId2 in parentChild(adnId)">
    <p v-if="'p'==ea(adnId2, 'r_value_22')">
        {{ea(adnId2, 'value_22')}} </p>
    <template v-if="376617==ea(adnId2, 'reference2')">
      <div class="w3-container w3-topbar w3-light-grey">
        {{adnId2}}
        {{ea(adnId2, 'value_22').split(',')}}
        </div>
        <div v-for="adnId3 in ea(adnId2, 'value_22').split(',')">
          <FhirPart :adnId="adnId3"/>
        </div>
    </template>
  </template>
</template>
  `
}
