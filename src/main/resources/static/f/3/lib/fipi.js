'use strict'
export const
    fipi = {},// FHIR Info Page Interface
    fipi2 = {},
    fipiFn = {}

fipiFn.initPageParts = (rawFipiStr, ppId) => {

    // console.log(rawFipiStr, ppId, fipi)
    !rawFipiStr.includes('itjn=') &&
        fipiFn.initFromURI(rawFipiStr, ppId)

    rawFipiStr.includes('itjn=') &&
        fipiFn.initFromJson(rawFipiStr.replace('itjn=', ''), ppId)
}

fipiFn.initFromURI = (rawFipiStr, ppId) => {

    !fipi.l_ppId && (fipi.l_ppId = [])
    fipi.l_ppId.push(ppId)

    !fipi.ppId && (fipi.ppId = {})
    const pl2 = rawFipiStr.split(';').filter(im => 0 == im.indexOf('pl2_'))
        .reduce((o, pl2) =>
            (o[pl2.split(',')[0].split('pl2_')[1]] = pl2.split(',').slice(1)) && o, {})

    fipi.ppId[ppId] = rawFipiStr.split(';').filter(im => im)
        .filter(im => 0 != im.split(';')[0].indexOf('pl2_')).reduce((o, im) => {
            const pp = im.split(',')[0], fipIdList = im.split(',').slice(1)

            o.l_pp.push(pp) && (o.pp[pp] = {
                l_fipId: fipIdList,
                fipId: fipIdList.reduce((o, fipId) => {
                    const pl2Obj = pl2[pp] && pl2[pp].includes(fipId) &&
                        { pl2: {} } || {}
                    return (o[fipId] = pl2Obj) && o
                }, {}),
            })

            pl2[pp] && 'lr' == pp &&
                (o.pp[pp].pl2 = { l_fipId: pl2[pp], fipId: {} })
                && pl2[pp].reduce((o2, adnId) => {
                    return (o2[adnId] = {}) && o2
                }, o.pp[pp].pl2.fipId)

            return o
        }, { pp: {}, l_pp: [] })

    console.log(ppId, fipi.ppId[ppId])
}

fipiFn.fip = {
    fEt: 'Element',
    fTy: 'Terminology',
    fDd: 'Data Dictionary',
    fPl: 'Profile',
    lr: 'Left|Right ::mc', //mc: Midnight Commander
}
