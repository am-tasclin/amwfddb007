'use struct'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */

const gridTableContainer = {}
/**
 * key:value -- all structuren for one or more accounting tables
 */

/**
 * Get or set and get one accounting table by key
 * Отримати або встановити та отримати одну облікову таблицю за ключем
 * @param {*} tableName 
 * @returns 
 */
export const gridTable = tableName => gridTableContainer[tableName]
    || (gridTableContainer[tableName] = {})

/**
 * Function block for build and use accounting table
 * Функціональний блок для створення та використання облікової таблиці
 * @param {*} tableName 
 * @returns 
 */
export const makerGridTable = tableName => {
    return {
        get: () => gridTable(tableName),
        setBodyColumns(bodyC) {
            gridTable(tableName).bodyColumnsA = bodyC
        } ,

        setHead(headC) {
            gridTable(tableName).headA = headC
        },

        getHead(){ return gridTable(tableName).headA },

        setTableBody(tableBody) {
            this.get().tableBody = tableBody
            !this.get().bodyColumnsA && this.setBodyColumns(Object.keys(tableBody[0]))
            return this
        },

        initSelectMaker(key, sqlTableName) {
            const selectMakerContainer = this.get().smc || (this.get().smc = {})
                , makeSelectForKey = selectMakerContainer[key] || (selectMakerContainer[key] = {})
            return SqlSelectMaker(makeSelectForKey, sqlTableName)
        },

        
        
    }
}


export const getHeadKeyObject = (tableName, key) => {

    const key1Name = Okeys( gridTable(tableName).headA)
        .find(key1Name1 =>  gridTable(tableName).headA[key1Name1].child
            &&  gridTable(tableName).headA[key1Name1].child[key])
            
    return key1Name &&  gridTable(tableName).headA[key1Name].child[key]

        ||  gridTable(tableName).headA[key]
}


/**
 * Block of functions to generate the SQL select with it init data collection
 * Блок функцій для генерації SQL select з його ініціальним набором даних
 * @param {*} smContainer 
 * @param {*} sqlTableName 
 * @returns 
 */


const SqlSelectMaker = (smContainer, sqlTableName) => {
    return {
        setHead(df) {
            smContainer.df = df
            return this
        },
        getHead() { return smContainer.df }
        ,

        getColumns: () => smContainer.columns || ' * ',

        getFrom: () => smContainer.from || sqlTableName,

        sqlTableName: sqlTableName,

        setFrom(from) {
            smContainer.from = from
            return this
        },

        initColumns(columns) {
            smContainer.columns = columns
            return this
        }, 

        setWhere(where) {
            smContainer.where = where
            return this
        }, 

        get() {
            let sql = 'SELECT '.concat(this.getColumns())
                .concat(' FROM ').concat(this.getFrom())
            smContainer.where && (sql += ' WHERE ' + smContainer.where)
            console.log('sql   ', sql)
            return sql
        },
    }
}

/**
 * Build list of selectedIds
 * @param {*} idList 
 * @param {*} r 
 * @returns 
 */
const tableRowSelectedIds = (idList, r) => idList.reduce(
    (o, idColName) => (o[idColName] = r[idColName]) && o, {})

/**
 * 
 */
export const TBodyFn = {
    isSelectedRow: (tagName, r) => gridTable(tagName).tableIds.reduce((tf, colIdName) =>
        tf && r[colIdName] == gridTable(tagName).rowSelectedIds[colIdName], true),
    selectRow: (tagName, r) => {
        gridTable(tagName).rowSelectedIds = !TBodyFn.isSelectedRow(tagName, r)
            && tableRowSelectedIds(gridTable(tagName).tableIds, r) || {}
        TBodyFn.selectRowReadDbFn && TBodyFn.selectRowReadDbFn(tagName)
    },
}

/**
 * 
 */
export const TBodyFnInitializer = {
    initTable: (tableIds, tableHeightEm) => Object.keys(gridTableContainer).forEach(tagName => {
        gridTable(tagName).tableIds = tableIds[tagName]
        gridTable(tagName).rowSelectedIds = {}
        gridTable(tagName).tableHeightEm = tableHeightEm[tagName]
    }),
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
