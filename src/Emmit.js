export default class Emmit {
  constructor () {
    this.events = new Map();
  }
  emit (event, ...props) {
    const trigger = new RegExp(event);
    const toRemove = [];
    this.events.forEach((events, key) => {
      if (trigger.test(key)) {
        events.forEach((e) => e.fn.apply(this, props));
        events = events.filter((e) => !e.once);
        if (events.length > 0) {
          this.events.set(event, events);
        } else {
          toRemove.push(key);
        }
      }
    })
    for (let value of toRemove) {
      this.events.delete(value);
    }
  }
  on (event, fn, options) {
    options = {
      once: false,
      fn,
      ...options
    }
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(options);
  }
  off (event) {
    const filter = new RegExp(event);
    const toRemove = [];
    this.events.forEach((events, key) => {
      if (filter.test(key)) {
        toRemove.push(key);
      }
    });
    for (let value of toRemove) {
      this.events.delete(value);
    }
  }
  once (event, f) {
    this.on(event, f, { once: true });
  }
}
