import { ProductModelT } from '../../../../../app/types/productModels';
import { apiBase } from '../../api';

export const ProductModelsService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getProductModels: builder.query<ProductModelT[], string | undefined>({
      query: () => ({
        url: '/productmodels',
      }),
      providesTags: ['ProductModels'],
    }),
  }),
});

export const { useGetProductModelsQuery } = ProductModelsService;
