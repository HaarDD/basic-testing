import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];

    const linkedList = generateLinkedList(input);

    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(linkedList).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const input = [4, 5, 6];

    const linkedList = generateLinkedList(input);

    expect(linkedList).toMatchSnapshot();
  });
});
