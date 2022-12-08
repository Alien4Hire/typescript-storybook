/* eslint-disable testing-library/no-debugging-utils */
import log from './logger';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('configApi', () => {
  describe('debug()', () => {
    it('should call console.log', () => {
      const consoleDebugSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      log.debug('mock message');
      expect(consoleDebugSpy).toHaveBeenCalledWith('mock message');
    });
  });

  describe('info()', () => {
    it('should call console.info', () => {
      const consoleInfoSpy = jest
        .spyOn(console, 'info')
        .mockImplementation(() => {});
      log.info('mock message');
      expect(consoleInfoSpy).toHaveBeenCalledWith('mock message');
    });
  });

  describe('error()', () => {
    it('should call console.error', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      log.error('mock message');
      expect(consoleErrorSpy).toHaveBeenCalledWith('mock message');
    });
  });
});
