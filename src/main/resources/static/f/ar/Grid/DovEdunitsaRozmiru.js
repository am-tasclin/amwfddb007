'use struct'
export const data = {}
data.table = [
    { id: 1,  name: "м.",  },
    { id: 2,  name: "кг",  },
    { id: 3,  name: "м2",},
    { id: 23, name: "см", },
    { id: 55, name: "бут", },
    { id: 23, name: "шт",},
    { id: 4,  name: "коробка", },
    { id: 12, name: "упаковка", },
    { id: 24, тame: "мг",  },
    
]

data.colAlias = {
    id: '№№',
    name: "Од. ізм"}

data.colNames = ['id', 'name']

data.colClassStyle = {
    id: { width: '60px', height: '30px', classhead: 'w3-col            w3-left-align' },
    name: { width: '150px', height: '30px', classhead: 'w3-col            w3-center' },
}

data2.colClassStylePole = {
    id: { width: '60px', formatpole: "", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
    name: { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
}

data.tablefooter = [
    { id: "|", name: "|",},
]

data2.footer1 = {
    id: { width: '60px',    footer1: "count(*)", footer2: "", classpole: 'w3-col  w3-green  w3-center' },
    name: { width: '150px', footer1: "",         footer2: "", classpole: 'w3-col  w3-green  w3-left-align' },
  
}

data.Nastroyki = {
    KolFooter: 2,
    SortPole: "",
    SortDesc: ""
}
