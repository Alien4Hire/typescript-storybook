import {
  DropdownMenu,
  MlDropdownMenuOptionPropsT,
} from '../DropdownMenu/DropdownMenu';
import { foldersForDropdown, FolderT } from '../../util/folderTree';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getInitialLessons,
  getLessons,
} from '../../app/reducers/lessons/lessonsSlice';
import { useEffect } from 'react';

export type FolderDropdownPropsT = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onItemClick: (folder: MlDropdownMenuOptionPropsT) => void;
  onClose: () => void;
};

const FolderDropdown = ({
  open,
  anchorEl,
  onItemClick,
  onClose,
}: FolderDropdownPropsT) => {
  const dispatch = useAppDispatch();

  // Temp until wired up with RTKquery to backend
  useEffect(() => {
    dispatch(getInitialLessons());
  }, [dispatch]);

  const { items: folders } = useAppSelector(getLessons);
  const options = foldersForDropdown(folders as FolderT);

  const handleItemClick = (selectedValue: string) => {
    const folder = options.find((o) => o.value === selectedValue);
    if (folder) {
      onItemClick(folder as MlDropdownMenuOptionPropsT);
    }
  };

  return (
    <DropdownMenu
      open={open}
      anchorEl={anchorEl}
      options={options}
      onItemClick={handleItemClick}
      onClose={onClose}
    />
  );
};

export default FolderDropdown;
