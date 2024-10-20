import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const accountFirstBalance = 200;
  const accountSecondBalance = 1000;

  let accountFirst: ReturnType<typeof getBankAccount>;
  let accountSecond: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    accountFirst = getBankAccount(accountFirstBalance);
    accountSecond = getBankAccount(accountSecondBalance);
  });

  test('should create account with initial balance', () => {
    expect(accountFirst.getBalance()).toBe(accountFirstBalance);
    expect(accountSecond.getBalance()).toBe(accountSecondBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawFromAc1 = 250;
    expect(() => accountFirst.withdraw(withdrawFromAc1)).toThrow(
      InsufficientFundsError,
    );
    expect(() => accountFirst.withdraw(withdrawFromAc1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${accountFirstBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferFromAc1ToAc2 = 250;
    const transferFromAc2ToAc1 = 1500;
    expect(() =>
      accountFirst.transfer(transferFromAc1ToAc2, accountSecond),
    ).toThrow(InsufficientFundsError);
    expect(() =>
      accountSecond.transfer(transferFromAc2ToAc1, accountFirst),
    ).toThrow(
      `Insufficient funds: cannot withdraw more than ${accountSecondBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => accountFirst.transfer(50, accountFirst)).toThrow(
      TransferFailedError,
    );
    expect(() => accountFirst.transfer(50, accountFirst)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const depositFromAc1 = 50;

    accountFirst.deposit(depositFromAc1);
    expect(accountFirst.getBalance()).toBe(
      accountFirstBalance + depositFromAc1,
    );
  });

  test('should withdraw money', () => {
    const withdrawFromAc1 = 50;
    accountFirst.withdraw(withdrawFromAc1);
    expect(accountFirst.getBalance()).toBe(
      accountFirstBalance - withdrawFromAc1,
    );
  });

  test('should transfer money', () => {
    const transferFromAc1ToAc2 = 50;

    accountFirst.transfer(transferFromAc1ToAc2, accountSecond);
    expect(accountFirst.getBalance()).toBe(
      accountFirstBalance - transferFromAc1ToAc2,
    );
    expect(accountSecond.getBalance()).toBe(
      accountSecondBalance + transferFromAc1ToAc2,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(50).mockReturnValueOnce(1);
    const balance = await accountFirst.fetchBalance();

    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 75;
    jest.spyOn(accountFirst, 'fetchBalance').mockResolvedValue(mockBalance);

    await accountFirst.synchronizeBalance();
    expect(accountFirst.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(accountFirst, 'fetchBalance').mockResolvedValue(null);

    await expect(accountFirst.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
