'use strict'
import { dbMpData, dbMpView } from '/f/3/lib/wsDbRw.js'

export default {
    data() { return { count: 0 } },
    mounted() {
        dbMpView.ff = this
    },
    methods: {
        ffl() { return dbMpData.list }
    },
    template: `
a1 FF
{{ffl()}}
a2
{{count}}
`,
}