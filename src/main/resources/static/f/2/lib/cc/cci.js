'use strict'
export const
    cci = { ccId: {}, l_ccId: [] }// Calc cell Info (as fipi)
    // , cace = {}// Calc cell
    , caceFn = {}// Calc cell

caceFn.tc = {} //tc: Table Calculation
caceFn.vRC = (ccId,ir, ic) => cci.ccId[ccId].vRC[ir] &&
    cci.ccId[ccId].vRC[ir][ic]