import TargetSideBarReducer, {
  setIsSideBarOpen,
  setSelectedFolder,
  resetTargetFolderSideBarState,
  TargetFolderSideBarI,
  setExpandedFolder,
} from './targetFolderSideBarSlice';

const initialState: TargetFolderSideBarI = {
  isSideBarOpen: false,
  selectedFolder: null,
  expandedFolders: {},
};

describe('targetFolderSideBarSlice', () => {
  it('Should return initial state', () => {
    expect(TargetSideBarReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });
  it('Should handle open sidebar', () => {
    expect(TargetSideBarReducer(initialState, setIsSideBarOpen(true))).toEqual({
      selectedFolder: null,
      isSideBarOpen: true,
      expandedFolders: {},
    });
  });
  it('Should handle set selected folder', () => {
    const rootItem = {
      id: 'root',
      name: 'Root Level',
      type: 'root' as 'root',
      children: [],
    };
    expect(
      TargetSideBarReducer(initialState, setSelectedFolder(rootItem))
    ).toEqual({
      selectedFolder: rootItem,
      isSideBarOpen: false,
      expandedFolders: {},
    });
  });
  it('Should reset to initial state', () => {
    TargetSideBarReducer(initialState, setIsSideBarOpen(true));
    expect(
      TargetSideBarReducer(initialState, resetTargetFolderSideBarState())
    ).toEqual(initialState);
  });
  it('Should add an expanded folder if not exist', () => {
    expect(
      TargetSideBarReducer(initialState, setExpandedFolder('mock-id'))
    ).toEqual({ ...initialState, expandedFolders: { 'mock-id': true } });
  });
  it('Should  update expanded folder if exist', () => {
    const existingState = {
      ...initialState,
      expandedFolders: {
        'mock-id': true,
      },
    };
    expect(
      TargetSideBarReducer(existingState, setExpandedFolder('mock-id'))
    ).toEqual({ ...existingState, expandedFolders: { 'mock-id': false } });
  });
});
