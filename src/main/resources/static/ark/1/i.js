'use strict'
const { createApp } = Vue
import { dataObj, fnObj } from "./lib/ly1.js"
import Ct1 from "./lib/ct1.js"

console.log(123, Ct1)

const tA1 = createApp({
    data() { return { count: 0 } },
    methods: {
        d1() { return dataObj.d1 }
    },
})
tA1.component('t-ct-a1',Ct1)
tA1.mount('#tA1')