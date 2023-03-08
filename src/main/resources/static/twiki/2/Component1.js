export default {
  data() {
    return {
      count: 1
    }
  },
  props: { propNum: Number },
  template: `
<div class="w3-hover-shadow">
  <button @click="count++">Ok count++ {{count}}</button>
  <button @click="propNum++">Ok propNum++ {{propNum}}</button>
</div>
  `
}
