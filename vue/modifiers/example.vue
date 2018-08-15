<template>
  <section>
    <!--
      The prevent modifier does as you'd expect preventing the form
      form doing it's normal submission
    -->
    <form @submit.prevent="save">
      <!-- The lazy modifier syncs after change events rather than input events -->
      <input type="text" v-model.lazy="msg">

      <input type="text" v-model.trim="trimmedMsg">

      <!-- The number Attribute assures that the data is saved as a number -->
      <input type="number" v-model.number="num">
      <input type="submit" value="Submit">
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      trimmedMsg: '',
      num: 0
    }
  },
  methods: {
    save() {
      console.log(this.msg, this.num)
    }
  }
}
</script>

