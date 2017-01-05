export default class Emmit {
  constructor () {
    this.events = new Map();
  }
  emit (event, ...props) {
    if (this.events.has(event)) {
      let events = this.events.get(event);
      events.forEach((e) => e.fn.apply(this, props));
      events = events.filter((e) => !e.once);
      if (events.length > 0) {
        this.events.set(event, events);
      } else {
        this.events.delete(event);
      }
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
  once (event, f) {
    this.on(event, f, { once: true });
  }
}
