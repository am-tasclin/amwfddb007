'use struct'
const gridTableData = {}
export const setH1 = h1 => gridTableData.h1 = h1

export const setHead = head => gridTableData.head = head

export const headKeysWithChild = headObj =>
   //Список заголовков 1-го єтажа для тех у кого есть 2-й єтаж 
    Okeys(headObj).reduce((l, k) => headObj[k].child && l.push(k) && l  || l  , [])

const Okeys = Object.keys

