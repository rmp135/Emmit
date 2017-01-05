import Emmit from './Emmit.js'

describe("Emmit", () => {
  let e, mock, mockArg1, mockArg2;
  beforeEach(() => {
    e = new Emmit();
    mock = jest.fn();
    mockArg1 = {};
    mockArg2 = [];
  });
  describe("once", () => {
    it("should add the function to the events list", () => {
      e.once("event", mock);
      expect(e.events.has("event")).toBe(true);
      expect(e.events.get("event").length).toBe(1);
      expect(e.events.get("event")[0].fn).toBe(mock);
      expect(e.events.get("event")[0].once).toBe(true);
    });
    it("should remove the function after triggering", () => {
      e.once("event", mock);
      e.emit("event");
      expect(e.events.size).toBe(0);
    });
    it("should only trigger once", () => {
      e.once("event", mock);
      e.emit("event");
      expect(mock).toHaveBeenCalled();
      mock.mockReset();
      e.emit("event");
      expect(mock).not.toHaveBeenCalled();
    });
  });
  describe("on", () => {
    it("should add an event to the event list", () => {
      e.on('event', mock);
      expect(e.events.size).toBe(1);
      expect(e.events.has('event')).toBe(true);
      expect(e.events.get('event').length).toBe(1);
      expect(e.events.get('event')[0].fn).toBe(mock);
    });
    it("should trigger multiple times", () => {
      e.on("event", mock);
      e.emit("event", mockArg1);
      e.emit("event", mockArg2);
      expect(mock.mock.calls.length).toBe(2);
      expect(mock.mock.calls[0].length).toBe(1);
      expect(mock.mock.calls[0][0]).toBe(mockArg1);
      expect(mock.mock.calls[1].length).toBe(1);
      expect(mock.mock.calls[1][0]).toBe(mockArg2);
    });
    it("should trigger an event with multiple arguments", () => {
      e.on("event", mock);
      e.emit("event", mockArg1, mockArg2);
      expect(mock.mock.calls.length).toBe(1);
      expect(mock.mock.calls[0][0]).toBe(mockArg1);
      expect(mock.mock.calls[0][1]).toBe(mockArg2);
    });
    // it("should trigger through a regular expression", () => {
    //   const mock = jest.fn();
    //   e.on("event", mock);
    //   e.emit(/.*/, mockArg1)
    // })
  });
});
