## Emmit

A dead simple event emitter.

---

Create an Emmit instance.

`const EmmitInstance = new Emmit();`

The following can then be called.

`EmmitInstance.on (name: string, fn: function)`

Will call function `fn` every time event `name` is triggered.

`EmmitInstance.once (name: string, fn: function)`

Will call function `fn` the first time event `name` is triggered. It will be autoremoved and not called again.

`EmmitInstance.emit (name: string)`

Will trigger the `name` event.