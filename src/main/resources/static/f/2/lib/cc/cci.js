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
caceFn.cFn.sum = (cc, k) => cc.dMap[k].fn.sum
    .reduce((sum, k2) => sum + cc.dMap[k2].v, 0)

caceFn.calcCell = cc => cc.l_dMap.filter(k => cc.dMap[k].fn)
    .forEach(k => {
        const r = caceFn.cFn[Object.keys(cc.dMap[k].fn)[0]](cc, k)
        cc.dMap[k].v = r
    })


