import lessonsReducer, {
  LessonStateI,
  selectFolderItem,
  moveFolderItem,
  addFolderItem,
  removeFolderItem,
  expandFolderItem,
  setReorganizeMode,
  exitEditMode,
} from './lessonsSlice';

import { data, children } from '../../../components/FolderNavigator/sampleData';
import FolderTree, { FolderT } from '../../../util/folderTree';
import { addParentIdToFolders } from '../../../util/folderTree';
import { TemplateNodeOrderT } from '../../../../../app/types/templateNodes';

describe('lessons reducer', () => {
  const initialState: LessonStateI = {
    items: {
      id: '0',
      name: 'Root',
      type: 'root',
      children: [],
    },
    selected: [],
    expanded: [],
    reorderedItems: [],
    canReorganize: false,
    reorganizeMode: false,
  };

  const initialItems = { ...data, children };

  const items = addParentIdToFolders(initialItems as FolderT);
  const populatedState = { ...initialState, items };

  it('should handle initial state', () => {
    expect(lessonsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should select a folder item', () => {
    const actual = lessonsReducer(
      populatedState,
      selectFolderItem({
        checked: true,
        nodes: {
          id: '16',
          name: 'Intro quiz',
          type: 'activity',
        },
      })
    );
    expect(actual.selected).toEqual(['16']);
  });

  it('should expand a folder item', () => {
    const actual = lessonsReducer(populatedState, expandFolderItem(['14']));
    expect(actual.expanded).toEqual(['14']);
  });

  it('should move a folder item', () => {
    const updatedNodes: TemplateNodeOrderT[] = [];
    const items = FolderTree.moveFolderItem(
      populatedState.items,
      ['16'],
      'down',
      updatedNodes
    );
    const actual = lessonsReducer(
      { ...populatedState, selected: ['16'] },
      moveFolderItem('down')
    );
    expect(actual.items).toEqual(items);
  });

  it('should add a folder item', () => {
    const itemToBeAdded: FolderT = {
      id: '301',
      name: 'Intro quiz',
      type: 'activity',
      parentId: '14',
    };
    const items = FolderTree.addFolderItem(initialState.items, itemToBeAdded);

    const actual = lessonsReducer(initialState, addFolderItem(itemToBeAdded));
    expect(actual.items).toEqual(items);
  });

  it('should delete a folder item', () => {
    const itemToBeRemoved: FolderT = {
      id: '3',
      name: 'Intro quiz',
      type: 'activity',
      parentId: '14',
    };
    const items = FolderTree.removeFolderItem(
      initialState.items,
      itemToBeRemoved
    );

    const actual = lessonsReducer(
      initialState,
      removeFolderItem(itemToBeRemoved)
    );
    expect(actual.items).toEqual(items);
  });

  it('should set reorganize mode', () => {
    const actual = lessonsReducer(populatedState, setReorganizeMode(true));
    expect(actual.reorganizeMode).toEqual(true);
  });

  it('should reset selected folders to default', () => {
    const currentState = {
      ...populatedState,
      selected: ['mock-selected-id'],
    };
    const actual = lessonsReducer(currentState, exitEditMode());
    expect(actual.selected).toEqual([]);
  });
});
