import { ChainableApi, TestGroup } from "./types";
import { testRunner } from "./runner";

const getInitialTestGroup = (description: string): TestGroup => {
  return {
    description,
    tests: [],
    before: [],
    beforeEach: [],
    after: [],
    afterEach: []
  };
};

function before(fn: Function): ChainableApi {
  this.currentTestGroup.before.push(fn);
  return this;
}

function after(fn: Function): ChainableApi {
  this.currentTestGroup.after.push(fn);
  return this;
}

function beforeEach(fn: Function): ChainableApi {
  this.currentTestGroup.beforeEach.push(fn);
  return this;
}

function afterEach(fn: Function): ChainableApi {
  this.currentTestGroup.afterEach.push(fn);
  return this;
}

function test(description: string, fn: Function): ChainableApi {
  this.currentTestGroup.tests.push({
    description,
    fn,
    result: {
      type: null,
      error: null,
      beforeError: null,
      beforeEachError: null,
      afterError: null,
      afterEachError: null
    }
  });
  return this;
}

function describe(description: string): ChainableApi {
  const currentTestGroup: TestGroup = getInitialTestGroup(description);
  testRunner.pushTestGroup(currentTestGroup);
  return {
    currentTestGroup,
    it: test,
    case: test,
    before,
    beforeEach,
    after,
    afterEach
  };
}

export { describe, test, before, beforeEach, after, afterEach };
