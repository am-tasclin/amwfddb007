import Component1 from './Component1.js'
import Component2 from './Component2.js'
export default {
  data() {
    return {
      msg: 'Hello World!'
    }
  },
  components: {
    Component1,
    Component2
  },
  template: `
  <h1>{{ msg }}</h1>
  <input v-model="msg">
  <Component1 propNum="2" />
  a2
  <Component2 />
a2
  `
}
