'use strict'
// import { createApp } from 'vue'
console.log(123)
const { createApp } = Vue
console.log(123)
const app = createApp({
    template: '#ttApp',
    data() {
        return { count: 4 }
    },
})
console.log(app)
console.log(app.count)
const appM = app.mount('#app')
console.log(appM)
// appM.count ++
console.log(appM.count++)
// console.log(appM.$data.count++, 123)
createApp({ template: '#ttApp2', }).mount('#app2')
// import App from './App.vue'
// console.log(123)
// createApp(App).mount('#app')