
'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
import THead      from './libGridTable/THead.js'
import TBody      from './libGridTable/TBody.js'
import TFood      from './libGridTable/TFood.js'
import TFoodAll   from './libGridTable/TFoodAll.js'


createApp({
    components: { THead, TBody, TFood, TFoodAll },
    template: `
<table>
    <caption>Дов ідн ик!</caption>
    <THead />
    <TBody/>
    <TFoodAll/>
    <TFood/>
</table>
`,
}).mount('#tGridTable1')