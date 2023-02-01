'use strict'
const { createApp, ref } = Vue
    , lib = {} //lib: Library (not for HTML Page)
    , pd = {} //pd: Page Data
pd.siteTitle = 'aTaC'
pd.tc = {} //tc: Table Calculation
pd.tc.square_size = [5, 4]
pd.tc.sqSeList = (rc) => Array.from(Array(pd.tc.square_size[rc || 0]).keys())
pd.tc.sqSeListC = () => pd.tc.sqSeList(1)
pd.tc.withFormula = true
pd.tc.openEdit = false
console.log(pd.tc.sqSeList(), pd.tc.sqSeListC())

pd.cellValue = (r, c) => {
    const v = { v: {} }
    if (pd.tc.vRC[r] && pd.tc.vRC[r][c]) {
        pd.dMap[pd.tc.vRC[r][c]].sum && (pd.dMap[pd.tc.vRC[r][c]].v = pd.dMap[pd.tc.vRC[r][c]]
            //sum: calcutus
            .sum.reduce((s, n) => s + pd.dMap[n].v, 0))
        v.v = pd.dMap[pd.tc.vRC[r][c]]
    }
    return v
}
pd.tc.vRC = { 1: { 1: 1 }, 2: { 1: 2 }, 3: { 1: 3 }, }
pd.dMap = { 1: { v: 4 }, 2: { v: 5 }, 3: { sum: [1, 2] } }
pd.fnList = "_sum_max_cnt_avg_"
pd.dMapMaxKey = () => Object.keys(pd.dMap).reduce((a, b) => Math.max(a, b)
    , -Infinity)
pd.count = 0
export default pd
console.log(pd)
//dev
cdb.dMap = pd.dMap
cdb.fnList = pd.fnList
//dev::END

pd.edCellAdress = window.location.hash.split('_')[1]
pd.cellCoordinate = (c, r) => 'C' + c + 'R' + r
pd.edCellAdressCoordinate = () => pd.edCellAdress.replace("C", "").split("R")
const atac01 = createApp({
    methods: {
        cellClick(cellCoordinate) {
            console.log(123, cellCoordinate)
            this.edCellAdress = cellCoordinate
        }
    }, data() { return pd }
})

atac01.component('t-tac01-edcell', {
    props: { vl: Number, dmKey: Number }, data() { return pd },
    methods: {
        it(e) {
            const c = { k: 0 }
            console.log(e.target.value, this.vl, this.dmKey,)
            // d.eMap[this.adnId].v22 = e.target.value
            if (!this.dmKey && c.k == 0) {
                c.k = pd.dMapMaxKey() + 1
                pd.dMap[c.k] = {}
                c.cr = pd.edCellAdressCoordinate()
                const vrc = {}; vrc[c.cr[0]] = c.k
                pd.tc.vRC[c.cr[1]] = vrc
                console.log(c)
            }
            pd.dMap[this.dmKey || c.k].v = 1 * e.target.value
        }, cellObj() {
            return pd.dMap[this.dmKey] || {}
        }, okSave() {
            console.log(pd.dMap)
            // pd.count++
        }
    }, template: "#tTac01Edcell"
})

atac01.mount('#atac01')
createApp({ data() { return pd } }).mount('#headTitle')

atac01.config.errorHandler = err => console.error('-oed01-', err)
