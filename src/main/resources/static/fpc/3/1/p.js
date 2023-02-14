'use strict'

const { createApp, nextTick } = Vue

const app =
    createApp({
        methods: {
            async increment2() {
                this.count++

                // DOM not yet updated
                console.log(document.getElementById('increment2').textContent) // 

                await nextTick()
                // DOM is now updated
                console.log(document.getElementById('increment2').textContent) // 
            },
            increment() {
                this.count++
            }
        },
        // `mounted` is a lifecycle hook which we will explain later
        mounted() {
            // `this` refers to the component instance.
            console.log(this.count) // => 1
            // data can be mutated as well
            this.count = 2
            this.increment()

            const newObject = {}
            this.someObject = newObject

            console.log(newObject === this.someObject) // false
        },
        data() {
            return {
                someObject: {},
                message: 'Hello Vue!',
                count: 0,
                rawHtml: '<span style="color: red">This should be red.</span>',
                dynamicId: 11,
                dynamicId2: 22,
                isButtonDisabled: true,
                objectOfAttrs: {
                    id: 'container',
                    class: 'w3-yellow'
                },
            }
        }
    }).mount('#app')

console.log(app)

app.config = {}
app.config.errorHandler = (err) => {
    /* handle error */
    console.error(err)
}