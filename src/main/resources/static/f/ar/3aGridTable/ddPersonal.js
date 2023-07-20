'use struct'
import { setH1, setHead, setColumns, setBody, } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),

    columns: setColumns([
        'idnom', 
        'dateprov',
        'sumaprov', 
         'nameval', 
         'snal',
         'namekassop', 
         'namecontr', 
         'iddoc', 
         'nameoperator', 
    ]),


    head: setHead({
        idnom: {
            alias: '№№', style: 'width: 50px;', filter: 'dnom',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },

        dateprov: {
            alias: 'Дата', style: 'width: 40px;', filter: 'dateprov',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "dat_1", formatFoot: "count", formatFootAll: "count"
        },

        money: {
            alias: 'Грн',
            classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                sumaprov: {
                    alias: "сума", style: 'width: 50px;', filter: 'sumaprov',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: "",
                },
                nameval: {
                    alias: 'вадита', style: 'width: 50px;', filter: 'nameval',
                    classHead: 'w3-red w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                },
                snal: {
                    alias: 'нал/безнал', style: 'width: 50px;', filter: 'snal',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                },
            }
        },
        namekassop: {
            alias: 'Касова опер-я', style: 'width: 40px;', filter: 'id',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFoot: "", formatFootAll: ""
        },

        contragent: {
            alias: 'Контрагент',
            filter: '',
            classHead: 'w3-border w3-hover-shadow w3-blue w3-center',
            child: {
                namecontr: {
                    alias: "наименование", style: 'width:50px;', filter: 'namecontr',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "max", formatFood: ""
                },
                iddoc: {
                    alias: "№док", style: 'width:100px;', filter: 'iddoc',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                }
            }
        },
        nameoperator: {
            alias: 'Операция', style: 'width: 200px;',filter: 'nameoperator',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFood: "", formatFoodAll: ""
        },


    }),


    body: setBody([    
    {idnom:   122,dateprov:"2022-01-10",             sumaprov:"   155.0",nameval:"$      ",snal:"нал   ",namekassop:"Еллектричество  ",iddoc:"1253", namecontr:"dsd                  ",nameoperator:"Сидоренко "}      ,
    {idnom:   123,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"нал   ",namekassop:"Еллектричество  ",iddoc:"8520", namecontr:"dsd                  ",nameoperator:"Таланенко И.В"}      ,
    {idnom:   126,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"$      ",snal:"Безнал",namekassop:"Физиопроцедуры  ",iddoc:"3156", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   129,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"$      ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"2456", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   132,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"грн    ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"2864", namecontr:"dsd                  ",nameoperator:"Сидоренко    "}      ,
    {idnom:   133,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"грн    ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"1594", namecontr:"dsd                  ",nameoperator:"Сидоренко    "}      ,
    {idnom:   134,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"$      ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"6431", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   114,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   155.0",nameval:"грн    ",snal:"Безнал",namekassop:"undefined       ",iddoc:"8319", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   125,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   155.0",nameval:"грн    ",snal:"нал   ",namekassop:"Еллектричество  ",iddoc:"4567", namecontr:"dsd                  ",nameoperator:"Таланенко И.В"}      ,
    {idnom:   128,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"$      ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"85236",namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   130,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"грн    ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"125",  namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   131,dateprov:"2022-01-10 00:00:00.000",sumaprov:"   250.0",nameval:"грн    ",snal:"нал   ",namekassop:"Физиопроцедуры  ",iddoc:"57489",namecontr:"dsd                  ",nameoperator:"            "}     , 
    {idnom:   135,dateprov:"2022-01-25 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"      ",namekassop:"Закупка лекарств",iddoc:"2678", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   136,dateprov:"2022-01-25 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"      ",namekassop:"Закупка лекарств",iddoc:"7416", namecontr:"dsd                  ",nameoperator:"            "}      ,
    {idnom:   137,dateprov:"2022-01-25 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"      ",namekassop:"Закупка лекарств",iddoc:"8524", namecontr:"dsd                  ",nameoperator:"Сидоренко   "},      
    {idnom:   138,dateprov:"2022-01-25 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"      ",namekassop:"Закупка лекарств",iddoc:"5248", namecontr:"dsd                  ",nameoperator:"Сидоренко   "},      
    {idnom:   139,dateprov:"2022-01-25 00:00:00.000",sumaprov:"   155.0",nameval:"$      ",snal:"      ",namekassop:"Закупка лекарств",iddoc:"8524", namecontr:"dsd                  ",nameoperator:"Сидоренко   "},      
    ]),     
        
    // localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {

}
