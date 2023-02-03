'use strict'
const { createApp, ref } = Vue
, pd = {} //pd: Page Data
pd.siteTitle = 'FPC'

createApp({ data() { return pd } }).mount('#headTitle')
