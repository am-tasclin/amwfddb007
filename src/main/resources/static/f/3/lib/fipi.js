'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
export const
    fipi = {},// FHIR Info Page Interface
    fipi2 = {},
    fipiFn = {}

// for SQL IN
// from fipi config fipi.ppId.pp.
fipiFn.getAllAdnIds = () => fipi.l_ppId && fipi.l_ppId.reduce((idList, ppId) => fipi.ppId[ppId]
    .l_pp.filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(
        fipId => !idList.includes(fipId) &&
            idList.splice(0, 0, fipId))) && idList, [])

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

    const ppl2 = rawFipiStr.split(';').filter(im => 0 == im.indexOf('ppl2_'))
        .reduce((o, ppl2) =>
            (o[ppl2.split(',')[0].split('ppl2_')[1]] = ppl2.split(',').slice(1)) && o, {})

    console.log(pl2)


    fipi.ppId[ppId] = rawFipiStr.split(';').filter(im => im)
        .filter(im => 0 != im.split(';')[0].indexOf('ppl2_')).reduce((o, im) => {
            const pp = im.split(',')[0], fipIdList = im.split(',').slice(1)

            o.l_pp.push(pp) && (o.pp[pp] = {
                l_fipId: fipIdList,
                fipId: fipIdList.reduce((o, fipId) => {
                    const pl2Obj = pl2[pp] && pl2[pp].includes(fipId) &&
                        { pl2: {} } || {}
                    return (o[fipId] = pl2Obj) && o
                }, {}),
            })

            ppl2[pp]
                && (o.pp[pp].ppl2 = { l_fipId: ppl2[pp], fipId: {} })
                && ppl2[pp].reduce((o2, adnId) => (o2[adnId] = {}) && o2
                    , o.pp[pp].ppl2.fipId
                )

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

fipi2.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fipi2.initPP_AfterRead = () => fipi2.fipId.find(adnId => fipi.l_ppId.find(ppId =>
    fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].l_fipId
        .find(fipId => fipi.ppId[ppId].pp[pp].fipId[fipId]
            .fhirPart && Object.keys(fipi.ppId[ppId].pp[pp].fipId[fipId]
                .fhirPart).filter(fpId => fpId == adnId).find(fpId => {
                    fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[fpId].count++
                    fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson &&
                        fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson.count++
                })))))

fipi2.viewAdnAfterRead = () => {
    console.log(fipi)
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp
        .filter(pp => fipi.ppId[ppId].pp[pp].pl2)
        .forEach(pp => fipi.ppId[ppId].pp[pp].pl2.l_fipId.find(fipId => {
            //  fipi.ppId[ppId].pp[pp].pl2.fipId[fipId]
            console.log(ppId, pp, fipId
                , fipi.ppId[ppId].pp[pp].pl2.fipId
            )
        })))
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => fipi
        .ppId[ppId].pp[pp].l_fipId.find(adnId => {
            fipi.ppId[ppId].pp[pp].fipId[adnId].fhirPart[adnId].count++
            // fipi.ppId[ppId].pp[pp].fipId[adnId].pl2
            //     && fipi.ppId[ppId].pp[pp].fipId[adnId].pl2.fhirPart[adnId].count++

            console.log(ppId, pp, adnId
                , fipi.ppId[ppId].pp[pp].pl2
                , fipi.ppId[ppId].pp[pp].fipId[adnId].fhirPart[adnId]
                , fipi.ppId[ppId].pp[pp].fipId[adnId].fhirPart[adnId].count
                , pd.i(adnId, 'value_22')
            )

        })))
    // fipi2.fipId
}
