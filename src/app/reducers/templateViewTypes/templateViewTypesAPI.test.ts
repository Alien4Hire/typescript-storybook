import { TemplateViewTypesService } from './templateViewTypesAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockedTemplateViewTypes = [
  {
    id: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
    name: 'Resource Structure',
    description: 'Base list of activities for course',
  },
  {
    id: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
    name: 'Prebuilt Course',
    description:
      'The prebuilt course gives the instructor a pre-built set of activities.',
  },
];

describe('Template View Types Endpoint request', () => {
  it('should list all template view types', async () => {
    expect.assertions(3);
    fetchMock.mockResponse(JSON.stringify({ data: mockedTemplateViewTypes }));

    const { isSuccess, data, status } = await store.dispatch(
      TemplateViewTypesService.endpoints.getTemplateViewTypes.initiate(
        undefined
      )
    );
    expect(status).toBe('fulfilled');
    expect(isSuccess).toBe(true);
    expect(data).toStrictEqual({ data: mockedTemplateViewTypes });
  });
});
