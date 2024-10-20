import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: <T extends (...args: unknown[]) => unknown>(fn: T): T => fn,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const data = { data: 'some data' };

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue(data);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/test';
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/test');
    expect(result).toEqual(data.data);
  });
});
