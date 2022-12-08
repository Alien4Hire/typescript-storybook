import { useState, useEffect, useCallback } from 'react';
import { useGetTemplatesQuery } from '../../../app/reducers/templates/templateAPI';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setTemplate,
  setTemplateListResult,
  selectTemplateList,
} from '../../../app/reducers/templates/templateSlice';
import TemplatesPageView from './TemplatesPageView';
import { MlTemplateVersionsT } from '../../../../../app/types/templates';
import { useGetTemplateViewTypesQuery } from '../../../app/reducers/templateViewTypes/templateViewTypesAPI';
import {
  setSelectedViewType,
  setTemplateViewTypes,
} from '../../../app/reducers/templateViewTypes/templateViewTypesSlice';
import {
  exitEditMode,
  setReorganizeMode,
} from '../../../app/reducers/lessons/lessonsSlice';
import { resetTargetFolderSideBarState } from '../../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';

const TemplatesPage = () => {
  const dispatch = useAppDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const templateListResult = useAppSelector(selectTemplateList);
  const [searchString, setSearchString] = useState<string>('');

  const onChange = useCallback(
    (text: string) => {
      setSearchString(text);
    },
    [setSearchString]
  );

  useEffect(() => {
    dispatch(setTemplate(undefined));
    dispatch(setSelectedViewType(undefined));
    dispatch(exitEditMode());
    dispatch(resetTargetFolderSideBarState());
    dispatch(setReorganizeMode(false));
  }, [dispatch]);

  const { data: templates = [], isLoading } = useGetTemplatesQuery({
    page: page,
    pageSize: pageSize,
    searchString,
  });

  const { data: templateViewTypes = [] } =
    useGetTemplateViewTypesQuery(undefined);

  useEffect(() => {
    if (templates.length) {
      dispatch(setTemplateListResult({ templates, page }));
    }
    if (templateViewTypes.length) {
      dispatch(setTemplateViewTypes(templateViewTypes));
    }
  }, [dispatch, templates, page, templateViewTypes]);

  const templateListCombined = [] as MlTemplateVersionsT[];
  for (const propertyKey in templateListResult) {
    templateListCombined.push(...templateListResult[propertyKey]);
  }

  const hasMore = templates.length === pageSize;

  const altText = isLoading ? 'Loading server data' : '';
  return (
    <TemplatesPageView
      templates={templateListCombined}
      page={page}
      setPage={setPage}
      altText={altText}
      hasMore={hasMore}
      onChange={onChange}
    />
  );
};
export default TemplatesPage;
