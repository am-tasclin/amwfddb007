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
pd.tc.openEditFn = false
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
pd.fnName = n => n && Object.keys(cdb.dMap[n]).reduce((cc
    , c) => cc += cdb.fnList.includes('_' + c + '_') ? c : '', '')
pd.isFn = n => n && Object.keys(pd.dMap[n]).reduce((cc
    , c) => cc || pd.fnList.includes('_' + c + '_'), false)
pd.dMapMaxKey = () => Object.keys(pd.dMap).reduce((a, b) => Math.max(a, b)
    , -Infinity)
pd.count = 0
export default pd
console.log(pd)
//dev
cdb.fnName = pd.fnName
cdb.dMap = pd.dMap
cdb.tc = pd.tc
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

pd.dmKeysWithoutSelf = n => Object.keys(pd.dMap).filter(c => 1 * c != n)

atac01.component('t-tac01-edcell', {
    props: { vl: Number, dmKey: Number }, data() { return pd },
    methods: {
        it(e) {
            !pd.newDm && (pd.newDm = { k: 1 + pd.dMapMaxKey(), cr: pd.edCellAdress })
            const dmKey = this.dmKey || pd.newDm.k
                , cr = pd.edCellAdressCoordinate()
            pd.newDm.cr != cr && Object.assign(pd.newDm
                , { k: 1 + pd.dMapMaxKey(), cr: pd.edCellAdressCoordinate() })
            !pd.dMap[dmKey] && (pd.dMap[dmKey] = { v: 0 })
            pd.dMap[dmKey].v = 1 * e.target.value
            // console.log(e.target.value, pd.newDm, pd.edCellAdress, pd.dMap[dmKey], cr)
            !pd.tc.vRC[cr[1]] && (pd.tc.vRC[cr[1]] = {})
            !pd.tc.vRC[cr[1]][cr[0]] && (pd.tc.vRC[cr[1]][cr[0]] = dmKey)
            // console.log(pd.tc.vRC[cr[1]][cr[0]],)
        }
        , addFn(f) {
            !pd.newF && (pd.newF = {fName: f })
            pd.newF[f] = []
            const  cr = pd.edCellAdressCoordinate()
            console.log(123, f, pd.newF, cr)
        }
        , isIFn() { return pd.isFn(this.dmKey) }
        , dmKeysWS() { return pd.dmKeysWithoutSelf(this.dmKey) }
        , o() { return pd.dMap[this.dmKey] || {} }
        , fnAttObj() { return this.dmKey && pd.dMap[this.dmKey][pd.fnName(this.dmKey)] }
        , fnAtt(n) {//sum:[1,2] - add, remove numer
            if (this.fnAttObj().indexOf(1 * n) >= 0) this.fnAttObj()
                .splice(this.fnAttObj().indexOf(1 * n), 1)
            else this.fnAttObj().push(1 * n)
            console.log(123, this.fnAttObj())
        }, okRemove() {
            console.log(this.dmKey, pd.dMap[this.dmKey])
            delete pd.dMap[this.dmKey]
            Object.keys(pd.tc.vRC).reduce((cc, r) => Object.keys(pd.tc.vRC[r]
            ).filter(c => !pd.dMap[pd.tc.vRC[r][c]
            ] && delete pd.tc.vRC[r][c]), 0)
        }, okSave() {
            console.log(pd.dMap)
            // pd.count++
        }
    }, template: "#tTac01Edcell"
})
// atac01.directive('focus', focus)


atac01.mount('#atac01')
createApp({ data() { return pd } }).mount('#headTitle')

atac01.config.errorHandler = err => console.error('-oed01-', err)
