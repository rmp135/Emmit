export default class Emmit {
  constructor () {
    this.events = new Map();
  }
  emit (event, ...props) {
    const trigger = new RegExp(event);
    this.events.forEach((events, key) => {
      if (trigger.test(key)) {
        events.forEach((e) => e.fn.apply(this, props));
        this.events.set(key, events.filter((e) => !e.once));
      }
    });
    const nonEmpty = [...this.events].filter((e) => {
      return e[1].length > 0;
    });
    this.events = new Map(nonEmpty);
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
    const filtered = [...this.events].filter((eventDes) => {
      return !filter.test(eventDes[0]);
    });
    this.events = new Map(filtered);
  }
  once (event, f) {
    this.on(event, f, { once: true });
  }
}
