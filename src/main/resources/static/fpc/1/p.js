'use strict'
const { createApp, ref } = Vue
    , pd = {} //pd: Page Data
pd.siteTitle = 'FPC'
pd.fElId = 373071
pd.hashVrVl = window.location.hash.split('_')
pd.isHashVr = n => pd.hashVrVl[0].indexOf(n)==1
console.log(pd.hashVrVl, pd.isHashVr('fElId'))
pd.isHashVr('fElId') && (pd.fElId = 1*pd.hashVrVl[1])

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')
