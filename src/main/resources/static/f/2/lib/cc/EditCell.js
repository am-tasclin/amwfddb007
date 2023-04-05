'use strict'
import { cci, caceFn } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number, ir: Number, ic: Number },
    data() { return { count: 0 } },
    methods: {
        // vRC(ir, ic) { return caceFn.vRC(this.ccId, this.ir, this.ic) },
        vRC() {
            console.log(cci, this.ccId, this.ir, this.ic)
            console.log(caceFn.vRC(this.ccId, this.ir, this.ic))
            console.log(cci.ccId[this.ccId]
                .dMap[caceFn.vRC(this.ccId, this.ir, this.ic)])
            return cci.ccId[this.ccId]
                .dMap[caceFn.vRC(this.ccId, this.ir, this.ic)].v
        },
    }, template: `
    {{vRC()}}
    `
}