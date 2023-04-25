'use strict'
import { dataObj, fnObj } from "./ly1.js"
export default {
    data() { return { count: 0 } },
    methods: {
        d1() { return dataObj.d1 }
    },
    template:`
    Hi ct1
    <div>
    a1
    b={{d1().b}}
    </div>
    `
}