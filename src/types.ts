import { test, before, beforeEach, after, afterEach } from "./describe";

export interface ChainableApi {
  currentTestGroup: TestGroup;
  it: typeof test;
  case: typeof test;
  before: typeof before;
  beforeEach: typeof beforeEach;
  after: typeof after;
  afterEach: typeof afterEach;
}

export interface TestGroup {
  description: string;
  tests: Test[];
  before: Function[];
  beforeEach: Function[];
  after: Function[];
  afterEach: Function[];
}

export interface Test {
  description: string;
  fn: Function;
  result: TestResult;
}

export interface Options {
  rootDir: string;
  matching: string;
}

export interface TestResult {
  passed: boolean;
  error: Error;
  beforeError: Error;
  afterError: Error;
  beforeEachError: Error;
  afterEachError: Error;
}
