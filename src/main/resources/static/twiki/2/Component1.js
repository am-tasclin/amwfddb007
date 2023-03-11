export default {
  props: { propNum: Number }, data() { return { count: 1 } },
  template: `
<div class="w3-hover-shadow">
  <button @click="count++">Ok count++ {{count}}</button>
  <button @click="propNum++">Ok propNum++ {{propNum}}</button>
</div>
  `
}
