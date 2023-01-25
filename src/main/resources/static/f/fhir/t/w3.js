'use strict'
//----------def
const session = {},
    wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect")

const sqlArray = [{
    sqlName: "ValueSetTitle", sqlObj:[{n:"n1"}],
}, {
    sqlName: "UseValueSet", sqlObj:[{n:"n2"}],
}, {
    sqlName: "CodeSystemTitle"
},]

wsDbSelect.onmessage = event => {
    let obj = JSON.parse(event.data);
    session[obj.sqlName] = obj.list
// sqlArray[obj.sqlName]
}

const initPage = (file, func) => w3.http(file, function () {
    if (this.readyState == 4 && this.status == 200) {
        const newLocal = JSON.parse(this.responseText)
        if (!newLocal.sqlArray)
            newLocal.sqlArray = sqlArray
        func(newLocal)
    }
})

btn.loadDbSelect = () => {
    sqlArray.forEach(o => {
        let jn = { sqlName: o.sqlName, sql: lib1.replaceSql(sql_app[o.sqlName].sql) }
        let jns = JSON.stringify(jn)
        wsDbSelect.send(jns)
    })
}

sql_app.CodeSystemTitle = {
    name: 'CodeSystem.title',
    sql: 'SELECT s.value title, d.* FROM doc d \n\
    LEFT JOIN string s ON s.string_id=d.doc_id \n\
    WHERE d.reference = 373575',
}

sql_app.UseValueSet = {
    name: 'Використання ValueSet в атрибутах FHIR класів',
    sql: 'SELECT c.value c, sr.value sr, srr.value srr \n\
    , vs.doc_id vs_id, d.doc_id usevs_id, dr.*, d.reference2 c_id \n\
    FROM doc p, doc d \n\
    LEFT JOIN string c ON d.reference2=c.string_id \n\
    LEFT JOIN doc dr ON dr.doc_id=d.reference \n\
    LEFT JOIN string sr ON dr.doc_id=sr.string_id \n\
    LEFT JOIN string srr ON dr.reference=srr.string_id \n\
    , (:sql_app.ValueSetTitle ) vs \n\
    WHERE vs.doc_id=p.reference2 \n\
    AND p.doc_id=d.parent',
}

sql_app.ValueSetTitle = {
    name: 'ValueSet.title',
    sql: 'SELECT s.value title, d.* FROM doc d \n\
    LEFT JOIN string s ON s.string_id=d.doc_id \n\
    WHERE d.reference = 372045',
}

//----------run

// not work!
//btn.loadDbSelect()
