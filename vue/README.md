# Vue

Vue is the power house framework we've all used and grown to love. (Hopefully)

## Data

One thing I wanted to comment on is why oh why is data used as a `function` instead of just an object?

Well the answer to this is because if you re use a component you want the data to reset each time it is being used somewhere yes?

That's why we make it a function so each time the component is used data is called giving it a fresh object.

If we treated it as just an object, the data would never reset and you'd see duplication across your web app!
