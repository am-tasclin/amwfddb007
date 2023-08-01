'use struct'
import { setH1, setHead, setBody } from './libGridTable/libGridTable.js'


const ff ={}



export default {
    h1: setH1('Дов. товарів'),


    head: setHead({
        id_mat: {
            alias: '№№', style: 'width: 50px;', filter: 'id_mat',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },
        naim_mat: {
            alias: 'найменування', style: 'width: 50px;', filter: 'naim_mat',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },

    }),


    body: setBody([]),

    // localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {

}
