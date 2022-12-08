import {
  TemplateService,
  TemplateQueryParam,
  TemplateVersionQueryParamT,
} from './templateAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';
import {
  SyncTemplateViewsRequestT,
  TemplateRequestT,
} from '../../../../../app/types/templates';

const mockedTemplate = {
  bookAuthor: 'Macmillan Dev',
  description: 'Sample description for version 2',
  ebook: 'http://ebook/1111111111111',
  isbn: '1111111111111',
  learningObjectiveId: 'd54290b2-7488-47ad-a4e2-be15b67b50fa',
  productModel: 'ef7208a5-ea0e-4039-8771-53f0dcc1de62',
  productType: 'US',
  taxonomyId: 2177,
  templateId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
  templateMetaDataCreatedAt: '2022-05-31 21:11:36.476758+00',
  templateMetaDataId: '91b52975-ff84-43f3-83b6-8bcca1ebeaee',
  templateMetaDataUpdatedAt: '2022-05-31 21:11:36.476758+00',
  templateName: 'Robel-Gulgowski',
  templateShortId: '5818f06',
  templateVersionCreatedAt: '2022-05-31 21:11:36.410742+00',
  templateVersionCreatedBy: 'John Doe',
  templateVersionCreatedByUserId: '57d81b5c-915c-45a9-a100-dc4f064b39c7',
  templateVersionId: '26444347-785a-4acd-8c43-ef987c7e4ade',
  templateVersionLabel: 1,
  templateVersionName: 'Robel-Gulgowski (Version 2)',
  templateVersionShortId: '3db20a7',
  templateVersionStatus: 'ACTIVE',
  templateVersionUpdatedAt: '2022-05-31 21:11:36.410742+00',
  titleType: 'National',
} as TemplateRequestT;

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Template Endpoint request', () => {
  describe('When listing all templates', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param: TemplateQueryParam = {
        page: 0,
        pageSize: 10,
      };
      const { isSuccess, data, status } = await store.dispatch(
        TemplateService.endpoints.getTemplates.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
    test('Request should return status fulfilled when searching some text in templates', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param: TemplateQueryParam = {
        page: 0,
        pageSize: 10,
        searchString: 'ISBN',
      };
      const { isSuccess, data, status } = await store.dispatch(
        TemplateService.endpoints.getTemplates.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
    test('Request should return a template based on a templateId passed', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: mockedTemplate }));
      const param: TemplateVersionQueryParamT = {
        templateId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
        templateVersionId: '26444347-785a-4acd-8c43-ef987c7e4ade',
      };
      const { isSuccess, data, status } = await store.dispatch(
        TemplateService.endpoints.getTemplate.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: mockedTemplate });
    });
    test('Request should return a new version template based on a templateId and templateVersionId passed', async () => {
      expect.assertions(2);
      const newVersionTemplateMocked = {
        ...mockedTemplate,
        templateVersionLabel: 2,
      };
      fetchMock.mockResponse(JSON.stringify(newVersionTemplateMocked));
      return store
        .dispatch(
          TemplateService.endpoints.newVersionTemplate.initiate(mockedTemplate)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(newVersionTemplateMocked);
          expect(data.templateVersionLabel).toBe(2);
        });
    });
    test('Request should sync the resources to the prebuilt based on a templateId and templateVersionId passed', async () => {
      expect.assertions(1);
      const param: SyncTemplateViewsRequestT = {
        templateViewTypeId: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
        copyToTemplateViewTypeId: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce65',
        templateId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
        templateVersionId: '26444347-785a-4acd-8c43-ef987c7e4ade',
      };
      const res = await store.dispatch(
        TemplateService.endpoints.syncTemplateViews.initiate(param)
      );
      expect(res).toStrictEqual({ data: null });
    });
  });
});
