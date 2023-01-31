'use strict'
const { createApp, ref } = Vue
    , lib = {} //lib: Library (not for HTML Page)
    , pd = {} //pd: Page Data
pd.siteTitle = 'aTaC'
pd.tc = {} //tc: Table Calculation
pd.tc.square_size = 6
pd.tc.sqSeList = () => Array.from(Array(pd.tc.square_size).keys())

pd.cellCoordinate = (c, r) => 'C' + c + 'R' + r

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
pd.tc.vRC = {
    1: { 1: 1 },
    2: { 1: 2 },
    3: { 1: 3 },
}
pd.dMap = {
    1: { v: 4 },
    2: { v: 5 },
    3: { sum: [1, 2] }
}

export default pd
console.log(pd)

pd.edCellAdress = window.location.hash.split('_')[1]
createApp({
    methods: {
        cellClick(cellCoordinate) {
            console.log(123, cellCoordinate)
            this.edCellAdress = cellCoordinate
        }
    }, data() { return pd }
}).mount('#atac01')
createApp({ data() { return pd } }).mount('#headTitle')