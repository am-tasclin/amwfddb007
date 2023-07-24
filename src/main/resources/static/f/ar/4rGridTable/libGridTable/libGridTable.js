'use struct'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const gridTableContainer = {}

export const gridTable = tableName => gridTableContainer[tableName]
    || (gridTableContainer[tableName] = {})

export const makeGridTable = tableName => {
    const mGridTable = gridTable(tableName)
    return {
        get() { return mGridTable },
        setTableBody(tableBody) {
            mGridTable.tableBody = tableBody
            !mGridTable.bodyColumns && this.setBodyColumns(Object.keys(tableBody[0]))
            console.log(gridTableContainer)
        },
        setBodyColumns(bodyColumns) { mGridTable.bodyColumns = bodyColumns },
        makeSelect() { return mGridTable.makeSelect },
        initMakeSelect(sqlTableName) {
            mGridTable.makeSelect = makeSqlSelect(sqlTableName)
        },
    }
}

const makeSqlSelect = sqlTableName => {
    return {
        sqlTableName: sqlTableName,
        setFrom(from) { this.from = from },
        getFrom() { return this.from || sqlTableName },
        initColumns(columns) {
            this.columns = columns
            return this
        },
        getColumns() { return this.columns || ' * ' },
        get() {
            return 'SELECT '.concat(this.getColumns())
                .concat(' FROM ').concat(this.getFrom())
        },
    }
}
