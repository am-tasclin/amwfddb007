'use strict'
export const
    cci = { ccId: {}, l_ccId: [] }// Calc cell Info (as fipi)
    // , cace = {}// Calc cell
    , caceFn = {}// Calc cell

caceFn.tc = {} //tc: Table Calculation
caceFn.fnList = "_sum_max_cnt_avg_"
caceFn.vRC = (ccId, ir, ic) => cci.ccId[ccId].vRC[ir] &&
    cci.ccId[ccId].vRC[ir][ic]
caceFn.vRCObj = (ccId, ir, ic) => cci.ccId[ccId].dMap[caceFn.vRC(ccId, ir, ic)]

caceFn.cFn = {}
caceFn.fName = o => Object.keys(o.fn)[0]
caceFn.cFn.sum = (cc, k) => cc.dMap[k].fn.sum
    .reduce((sum, k2) => sum + cc.dMap[k2].v, 0)

caceFn.calcFnThisDate = (cc, dn) => {
    console.log(cc, dn)
    cc.l_dMap.filter(k => cc.dMap[k].fn)
        .filter(k => cc.dMap[k].fn[caceFn.fName(cc.dMap[k])].includes(dn))
        .forEach(k => {
            caceFn.calcFn(cc, k)
            console.log(k, cc.dMap[k], caceFn.fName(cc.dMap[k])
                , cc.dMap[k].fn[caceFn.fName(cc.dMap[k])]
                , cc.dMap[k].fn[caceFn.fName(cc.dMap[k])].includes(dn)
            )
        })
}

caceFn.calcFn = (cc, k) =>
    cc.dMap[k].v = caceFn.cFn[caceFn.fName(cc.dMap[k])](cc, k)

caceFn.calcCells = cc => cc.l_dMap.filter(k => cc.dMap[k].fn)
    .forEach(k => caceFn.calcFn(cc, k))


