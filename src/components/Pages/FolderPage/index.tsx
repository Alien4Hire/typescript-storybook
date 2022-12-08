import { CircularProgress } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getFilterStatus } from '../../../app/reducers/resourcesFilter/resourcesFilterSlice';
import { useGetTemplateViewTypesQuery } from '../../../app/reducers/templateViewTypes/templateViewTypesAPI';
import FilterResources from '../../FilterResources';
import FolderNavigator from '../../FolderNavigator/FolderNavigator';
import Toolbar from '../../Toolbar/Toolbar';
import TargetFolderSideBar from '../../../components/TargetFolderSideBar';
import { getLessons } from '../../../app/reducers/lessons/lessonsSlice';
import {
  getTargetSideBarStatus,
  resetTargetFolderSideBarState,
} from '../../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const FolderPage = () => {
  const dispatch = useAppDispatch();
  const isFilterOpen: boolean = useAppSelector(getFilterStatus);
  const isSideBarOpen = useAppSelector(getTargetSideBarStatus);
  const { items: folderList } = useAppSelector(getLessons);

  useEffect(() => {
    return () => {
      dispatch(resetTargetFolderSideBarState());
    };
  }, [dispatch]);
  const { isSuccess: templateViewTypesFetchSuccess } =
    useGetTemplateViewTypesQuery(undefined);

  // Ran into edge-case race condition where view types not
  // yet ready. This checks for successful fetch before
  // continuing.
  if (!templateViewTypesFetchSuccess) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ marginBottom: '10px' }}>
          <Toolbar color="primary" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%',
          }}
        >
          <Box sx={{ width: '100vw' }}>
            {' '}
            {isFilterOpen ? <FilterResources /> : <FolderNavigator />}
          </Box>
          <Box>
            <TargetFolderSideBar
              folders={folderList?.children}
              isOpen={isSideBarOpen}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FolderPage;
