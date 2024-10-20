import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 80, b: 10, action: Action.Divide, expected: 8 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 5, b: 1, action: 'invalid', expected: null },
  { a: 'any', b: 2, action: Action.Add, expected: null },
  { a: 1, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given a: $a, b: $b, action: $action, should return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
