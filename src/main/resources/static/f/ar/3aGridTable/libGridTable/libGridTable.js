'use struct'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const gridTableData = {}

gridTableData.component = {}
export const getGridComponent = () => gridTableData.component
export const getZapros = () => gridTableData.zapros
export const setH1 = h1 => gridTableData.h1 = h1

export const setHead = head => gridTableData.head = head
export const setBody = body => gridTableData.body = body
export const setColumns = columns => gridTableData.columns = columns
export const setZapros = zapros => gridTableData.zapros = zapros

export const getHead = () => gridTableData.head
export const getBody = () => gridTableData.body
export const getColumns = () => gridTableData.columns

export const getHeadKeyObject = key => {
    const key1Name = Okeys(gridTableData.head)
        .find(key1Name => gridTableData.head[key1Name].child
            && gridTableData.head[key1Name].child[key])
            
    return key1Name &&
        gridTableData.head[key1Name].child[key]
        || gridTableData.head[key]
}


export const headKeysWithChild = headObj =>
    /**
     * A list of object keys with the second level of depth. 
     * A list of the first level in an object that have level deep in the child key.
     * 
     * Список ключів об'єкта з другим рівнем глубини. 
     * Список першого рівня в об’єкті, які мають глибокий рівень у ключі child.
     * 
     */
    Okeys(headObj).reduce((l, k) => headObj[k].child && l.push(k) && l || l, [])

const Okeys = Object.keys
