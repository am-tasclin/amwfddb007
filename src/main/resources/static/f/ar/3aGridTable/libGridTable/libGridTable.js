'use struct'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const gridTableData = {}

export const setH1 = h1 => gridTableData.h1 = h1

export const setHead = head => gridTableData.head = head
export const setBody = body => gridTableData.body = body
export const setFood = food => gridTableData.food = food
export const setFoodAll = foodAll => gridTableData.foodAll = foodAll
export const setBodyColumns = bodyColumns => gridTableData.bodyColumns = bodyColumns
export const setFoodColumns = foodColumns => gridTableData.foodColumns = foodColumns
export const setFoodColumnsAll = foodColumnsAll => gridTableData.foodColumnsAll = foodColumnsAll
// export const setlocalperem = localperem => gridTableData.localperem = localperem
export const setbodyStylePole = bodyStylePole => gridTableData.bodyStylePole = bodyStylePole

export const getHead = () => gridTableData.head
export const getBody = () => gridTableData.body
export const getBodyColumns = () => gridTableData.bodyColumns
export const getFood = () => gridTableData.food
export const getFoodColumns = () => gridTableData.foodColumns
export const getFoodAll = () => gridTableData.foodAll
export const getFoodColumnsAll = () => gridTableData.foodColumnsAll
// export const getlocalperem = () => gridTableData.localperem
 export const getbodyStylePole =() => gridTableData.bodyStylePole

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
