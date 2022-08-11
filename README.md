# useAsyncData bug

What I expect to happen: If I use the same key for multiple invocations of useAsyncData, then during SSR the promise should only be invoked once, and once its finished the resolved data should be put into the 'data' Ref of all invocations.

What is happening: Only the first invocation receives the resolved data, subsequent invocations will await the same promise, but once it resolves they wont update their own 'data' Ref with the resolved data

# Demo

Both Foo.vue and Bar.vue use the same composable that uses useAsyncData with the same key, and yet if you open the SSRed page during runtime (e.g. open the page in your browser and disable JavaScript to make sure no hydration kicks in) you'll see that "Foo value: bar" will only appear for one of the components, even tho both components should have it.

So this is what should appear:
```
Foo value: bar
Foo value: bar
```

But this is what will actually appear (or some variation of this where one line has bar and the other one doesnt):
```
Foo value: bar
Foo value:
```

# Where the bug is

judging from the source code it seems that once the 1st invocations promise resolves, it only fills out the data object of that first invocation: https://github.com/nuxt/framework/blob/7a846a829209828c9c13508856e78f686293d1bc/packages/nuxt/src/app/composables/asyncData.ts#L149

the 2nd invocation is awaiting the same promise, but once it resolves, it just returns its own asyncData, without actually putting the results of the promise into it before hand the same way it's done for the original invocation (see previous link): https://github.com/nuxt/framework/blob/7a846a829209828c9c13508856e78f686293d1bc/packages/nuxt/src/app/composables/asyncData.ts#L204