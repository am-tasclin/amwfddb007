'use struct'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */

const gridTableContainer = {}
console.log(gridTableContainer)
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
    const mGridTableData = gridTable(tableName)
    return {
        get() { return mGridTableData },
        setTableBody(tableBody) {
            mGridTableData.tableBody = tableBody
            !mGridTableData.bodyColumns && this.setBodyColumns(Object.keys(tableBody[0]))
            return this
        },
        setBodyColumns(bodyColumns) { mGridTableData.bodyColumns = bodyColumns },
        initSelectMaker(key, sqlTableName) {
            const selectMakerContainer = mGridTableData.smc || (mGridTableData.smc = {})
                , makeSelectForKey = selectMakerContainer[key] || (selectMakerContainer[key] = {})
            return SqlSelectMaker(makeSelectForKey, sqlTableName)
        },
        showGtData() { return mGridTableData }
    }
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
        sqlTableName: sqlTableName,
        setFrom(from) {
            smContainer.from = from
            return this
        },
        getFrom: () => smContainer.from || sqlTableName,
        initColumns(columns) {
            smContainer.columns = columns
            return this
        },
        getColumns: () => smContainer.columns || ' * ',
        setWhere(where) {
            smContainer.where = where
            return this
        },
        get() {
            let sql = 'SELECT '.concat(this.getColumns())
                .concat(' FROM ').concat(this.getFrom())
            smContainer.where && (sql += ' WHERE ' + smContainer.where)
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
        gridTableContainer[tagName].tableIds = tableIds[tagName]
        gridTableContainer[tagName].rowSelectedIds = {}
        gridTableContainer[tagName].tableHeightEm = tableHeightEm[tagName]
    }),
}
