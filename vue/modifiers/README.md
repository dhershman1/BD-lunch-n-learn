# Modifiers

A really strong and sometimes hidden feature of vue is the ability to use modifiers. Especially using them on events!

The benefits modifiers offer is well, short code data to be exactly like you want it, without the need to manually transform or manually change the way things work.

Modifiers can even be chained! (**Order Matters when Chaining**)

## v-model Examples

You can check out the `example.vue` file for examples with input and v-model

## Event Examples

You can checkout the `event-example.vue` file for examples with events

## Keyboard Modifiers

Vue offers a wide range of modifiers for keys

You can use direct key codes as modifiers specializing that only when they key is hit, do you then run the attached function.

For example:

```vue
<input @keyup.13="submit">
```

Will only trigger our `submit` method when the `keyCode === 13`

However Vue knows that remembering key codes is a pain. Which means they have some of the most commonly used keys mapped out:

```vue
<input @keyup.enter="submit">
<input @keyup.tab="doThing">
```

Vue also supports Automatic key modifiers:

```vue
<input @keyup.page-down="doThing">
```

In the above out method `doThing` will only be called if `$event.key === 'PageDown'`.

> If you need to support IE9 usually the built-in aliases are usually preferred since IE9 can have inconsistent key values

You can even support System Keys for Modifiers for example:

```vue
<!-- Alt + C -->
<input @keyup.alt.67="doThing">

<!-- Ctrl + Click -->
<button @click.ctrl="doAnotherThing">Do Another Thing</button>
```

> It's important to note that modifier keys have to be pressed when the event is emitted when using `keyup`
> In other words `keyup.ctrl` will only trigger if you release the key while holding down  `ctrl`
> It will not trigger if you let go of the `ctrl` key alone

> **Pro Tip**: There is also a `.meta` modifier key, which relates to the command key on Mac OS, the Windows key on Windows, and meta is marked as a solid diamond on Sun Microsystems keyboards.

> **Pro Tip**: If you only want for certain a single key only is pressed use the `.exact` modifier, use it alone if you want it to only fire when no system modifiers are pressed, or attach it to a key to specificy only fire when that key is pressed

## Mouse Buttons

There are even modifiers for mouse buttons!

They're pretty straight forward though:

- `.left`
- `.right`
- `.middle`

which will restrict the handler to only be called by a specific mouse button
