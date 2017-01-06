## Emmit

A dead simple event emitter.

---

Create an Emmit instance.

`const EmmitInstance = new Emmit();`

The following can then be called.

`EmmitInstance.on(name: string, fn: function)`

Will call function `fn` every time event `name` is triggered.

`EmmitInstance.once(name: string | RegExp, fn: function)`

Will call function `fn` the first time event `name` is triggered. If a regular expression is used as the name, all events that match will be triggered. These events will be autoremoved and not called again.

`EmmitInstance.emit(name: string | RegExp)`

Will trigger the `name` event. If a regular expression is used as the name, all events that match will be triggered.

`EmmitInstance.off(name: string | RegExp)`

Will remove the `name` event. If a regular expression is used as the name, all events that match will be removed.
