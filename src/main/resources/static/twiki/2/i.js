'use strict'
const { createApp } = Vue
import App from './App.js'
//import Component1 from './Component1.js'
const app = createApp(App)
//app.component('t-ct', Component1)
const mApp = app.mount('#app')
console.log(mApp, mApp.msg)