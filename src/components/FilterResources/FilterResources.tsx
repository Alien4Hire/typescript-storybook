import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { setIsFilterOpen as actionSetIsFilterOpen } from '../../app/reducers/resourcesFilter/resourcesFilterSlice';
import { useGetActivitySettingsQuery } from '../../app/reducers/activitySettings/activitySettingsAPI';
import { SectionNavT } from '../LeftSideNavigation/LeftSideNavigation';
import { sampleOptions } from '../LeftSideNavigation/sampleOptions';
import FilterResourcesView from './FilterResourcesView';
import {
  ActivitiesQueryParam,
  useGetSearchResultsQuery,
} from '../../app/reducers/search/searchAPI';
import { setResultList } from '../../app/reducers/search/searchSlice';

const FilterResources = () => {
  const dispatch = useAppDispatch();
  const { templateId, templateVersionId } = useParams();
  const [sections, setSections] = useState<SectionNavT[]>(sampleOptions);
  const { data: activitySettingsList = [] } = useGetActivitySettingsQuery({
    templateId,
    templateVersionId,
  });
  const [keywordSearch, setKeywordSearch] = useState<string>('');
  const [skip, setSkip] = useState<boolean>(true);
  const [query, setQuery] = useState<ActivitiesQueryParam>({
    searchString: '',
  });

  useEffect(() => {
    if (activitySettingsList.length) {
      setSections((oldSections) =>
        oldSections.map((sec) => {
          if (sec.title === 'Activity Settings Rule') {
            const formattedActivitySettings = activitySettingsList.map(
              (ac) => ({
                value: ac.id,
                label: ac.name,
              })
            );
            return {
              ...sec,
              options: [
                { value: 'any', label: 'Any Activity Settings Rule' },
                { value: 'none', label: 'No Activity Settings Rule' },
                ...formattedActivitySettings,
              ],
            };
          }
          return sec;
        })
      );
    }
  }, [activitySettingsList]);

  const onSelectHandle = (idx: number, value: string) => {
    setSections((prev) => [
      ...prev.slice(0, idx),
      { ...prev[idx], selectedValue: value },
      ...prev.slice(idx + 1),
    ]);
  };

  const searchHandle = () => {
    let searchQuery: ActivitiesQueryParam = {
      searchString: keywordSearch,
      from: 0,
      size: 50,
    };

    for (let index = 0; index < sections.length; index++) {
      const section: SectionNavT = sections[index];
      if (section.selectedValue) {
        searchQuery = {
          ...searchQuery,
          [section.searchKey]: section.selectedValue,
        };
      }
    }
    setSkip(false);
    setQuery(searchQuery);
  };
  const { data } = useGetSearchResultsQuery(query, {
    skip,
  });
  useEffect(() => {
    dispatch(setResultList(data || []));
  }, [dispatch, data]);

  const closeHandler = () => {
    dispatch(actionSetIsFilterOpen(false));
  };

  const keywordSearchHandler = (val: string) => {
    setKeywordSearch(val);
  };

  return (
    <FilterResourcesView
      sections={sections}
      onSelectHandle={onSelectHandle}
      closeHandler={closeHandler}
      keywordSearch={keywordSearch}
      keywordSearchHandler={keywordSearchHandler}
      searchHandle={searchHandle}
    />
  );
};

export default FilterResources;
