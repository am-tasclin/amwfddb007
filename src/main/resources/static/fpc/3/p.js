'use strict'
import { square, cube } from 'lib'
import { sum } from 'lib2'
console.log(square(8)) //64
console.log(cube(8)) //512
console.log(sum(2, 3)) //5

// import { createApp } from 'vue'
const { createApp } = Vue

const pd = {
    data() {
        return {
            a: 1,
            b: 2,
            c: {
                d: 4
            },
            e: 5,
            f: 6
        }
    },
    watch: {
        // watching top-level property
        a(val, oldVal) {
            console.log(` "pd.a" new: ${val}, old: ${oldVal}`)
        },
        // string method name
        b: 'someMethod',
        // the callback will be called whenever any of the watched object properties change regardless of their nested depth
        c: {
            handler(val, oldVal) {
                console.log('c changed')
            },
            deep: true
        },
        // watching a single nested property:
        'c.d': function (val, oldVal) {
            // do something
            console.log(` "c.d : " new: ${val}, old: ${oldVal}`, this.c)
        },
        // the callback will be called immediately after the start of the observation
        e: {
            handler(val, oldVal) {
                console.log('e changed ', this.e, val, oldVal)
            },
            immediate: true
        },
        // you can pass array of callbacks, they will be called one-by-one
        f: [
            'handle1',
            function handle2(val, oldVal) {
                console.log('handle2 triggered')
            },
            {
                handler: function handle3(val, oldVal) {
                    console.log('handle3 triggered')
                }
                /* ... */
            }
        ]
    },
    methods: {
        someMethod() {
            console.log('b changed', this.b)
        },
        handle1() {
            console.log('\n handle 1 triggered')
        }
    },
    created() {
        this.a = 3 // => new: 3, old: 1
    }
}
export default pd

console.log(pd, 123123)

createApp(pd).mount('#app')
createApp(pd).mount('#app2')


let numbers = [11, 22, 33]
console.log(numbers[1]) // 22
console.log(numbers[11]) // 22

numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop]
        } else {
            return 0
        }
    }
})
console.log(numbers[1]) // 22
console.log(numbers[12]) // 0, no such item

let xn = {
    f1(p1, p2) {
        return p1 + p2
    },
    f2(p1) {
        return p1 in numbers
    }
}

console.log(xn.f2(2))
