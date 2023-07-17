
'use strict'
const { createApp } = Vue

import ddPersonal from './ddPersonal.js'
import THead from './libGridTable/THead.js'
import TBody from './libGridTable/TBody.js'
import TFood from './libGridTable/TFood.js'
import TFoodAll from './libGridTable/TFoodAll.js'



//   https://thecode.media/context-menu/

//  <script type="text/javascript">
// 	// запрещаем вызов стандартного меню
//   document.oncontextmenu = function() {return false;};
// 	// когда страница полностью загрузилась — можно показывать новое меню
// 	$(document).ready(function() {
//     // отслеживаем нажатие мыши на странице
//     $(document).mousedown(function(event) {
    
      
      
//       // если нажата правая кнопка мыши
//       if (event.which === 3)  {
          
//         // создаём новый блок, в котором будет наше меню
//         $('<div/>', {
//       		// назначаем ему свой класс, описанный в стилях, чтобы блок появился на странице
//           class: 'context-menu' 
//         })
//         .css({
//       		// получаем координаты клика и делаем их координатами меню
//           left: event.pageX+'px', 
//           top: event.pageY+'px' 
//         })
//         // добавляем блок на страницу
//         .appendTo('body') 
//         // и добавляем пункты в новое контекстное меню
//         .append( 
//         	$('<ul/>').append('<li><a href="https://thecode.media">Привет!</a></li>') 
//           	.append('<li><a href="https://thecode.media">Это журнал «Код»!</a></li>') 
//             .append('<li><a href="https://thecode.media">А это — новое контекстное меню</a></li>')
//                )
//         		// показываем новое меню
//         		.show('fast'); 
//       }
//       if (event.which != 3)  {
//       // убираем наше контекстное меню со страницы
//       setTimeout(() => {  $('.context-menu').remove(); }, 10); }
//     });
// 	});
// </script> */}

createApp({
    components: { THead, TBody, TFood, TFoodAll },

    template: `
    <caption>Довідник!</caption>


    <table>
       <THead />
    </table>
   
    <table>       
        <TBody/>
    </table>
    


    <table>
      <TFood/>
      <TFoodAll/>
    </table>
`,
}).mount('#tGridTable1')