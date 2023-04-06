'use strict'
export const
    cci = { ccId: {}, l_ccId: [] }// Calc cell Info (as fipi)
    // , cace = {}// Calc cell
    , caceFn = {}// Calc cell

caceFn.tc = {} //tc: Table Calculation
caceFn.fnList = "_sum_max_cnt_avg_"
caceFn.vRC = (ccId,ir, ic) => cci.ccId[ccId].vRC[ir] &&
    cci.ccId[ccId].vRC[ir][ic]