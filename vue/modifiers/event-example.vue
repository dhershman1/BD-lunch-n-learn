<template>
  <section>
    <!--
      The prevent modifier prevents submit from reloading the page
    -->
    <form @submit.prevent="save"></form>

    <!-- The click event's propagation will be stopped -->
    <a @click.stop="doThing"></a>

    <!-- Modifiers can be chained -->
    <a @click.stop.prevent="doThing"></a>

    <!-- Only triggers our handler if event.target is the elment itself -->
    <!-- (Not a child element) -->
    <a @click.self="doThing"></a>

    <!-- Since order DOES matter it's importent to note that -->
    <!-- @click.prevent.self will prevet ALL CLICKS -->
    <!-- While @click.self.prevent will on prevent clicks on the element itself -->

    <!-- This click event will only be recorded once at most -->
    <a @click.once="doThing"></a>

    <!-- Vue also supports a .passive modifier -->
    <!-- Which corresponds with the addEvenListeners passive option -->
    <a @scroll.passive="doThing"></a>
    <!-- This will trigger the default behaviour of scrolling immediately -->
    <!-- Instead of waiting for the function `doThing` to complete -->
    <!-- In case it contains something like event.preventDefault() -->
    <!-- Do not use .passive and .prevent together because .prevent will be ignored -->
  </section>
</template>

<script>
export default {
  methods: {
    save() {
      console.log('save called')
    },

    doThing() {
      console.log('a thing did')
    }
  }
}
</script>

