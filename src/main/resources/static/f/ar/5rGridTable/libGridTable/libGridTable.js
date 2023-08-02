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
    const mGridTableData = gridTable(tableName)
    return {
        get() { return mGridTableData },
        setTableBody(tableBody) {
            mGridTableData.tableBody = tableBody
            !mGridTableData.bodyColumns && this.setBodyColumns(Object.keys(tableBody[0]))
            console.log(gridTableContainer)
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
        getFrom() { return smContainer.from || sqlTableName },
        initColumns(columns) {
            smContainer.columns = columns
            return this
        },
        getColumns() { return smContainer.columns || ' * ' },
        get() {
            return 'SELECT '.concat(this.getColumns())
                .concat(' FROM ').concat(this.getFrom())
        },
    }
}
