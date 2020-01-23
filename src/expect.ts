import "colors";
import * as _ from "lodash";

const getToEqual = (value: any) => {
  return (expectedValue: any) => {
    if (!_.isEqual(value, expectedValue)) {
      throw new Error(`Expected ${expectedValue} to equal ${value}`.yellow);
    }
  };
};

const getNotToEqual = (value: any) => {
  return (expectedValue: any) => {
    if (_.isEqual(value, expectedValue)) {
      throw new Error(`Expected ${expectedValue} not to equal ${value}`.yellow);
    }
  };
};

export function expect(value: any) {
  return {
    toEqual: getToEqual(value),
    notToEqual: getNotToEqual(value)
  };
}
