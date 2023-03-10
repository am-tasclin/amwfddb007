'use strict'
import { pd } from '/fip/1/1/l1.js'
!pd.tWik && (pd.tWiki = {})
export default {
  props: { wId: Number }, data() { return { count: 1 } },
  mounted() { pd.tWiki[this.wId] = this },
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
  </template>
</template>
  `
}
