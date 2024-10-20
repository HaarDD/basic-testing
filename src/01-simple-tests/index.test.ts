import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Add,
    });
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 20,
      b: 5,
      action: Action.Subtract,
    });
    expect(result).toBe(15);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 5,
      action: Action.Multiply,
    });
    expect(result).toBe(25);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Divide,
    });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 1,
      b: 1,
      action: 'invalid',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'nothing',
      b: 10,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });

  test('should return null for missing arguments', () => {
    const result = simpleCalculator({
      a: 5,
      b: undefined,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
