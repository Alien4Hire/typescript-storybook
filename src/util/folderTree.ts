import { TemplateNodeOrderT } from '../../../app/types/templateNodes';
import { RecommendedUseEnum } from '../../../app/types/activitySettings';

export type FolderTypeT = 'root' | 'folder' | 'activity' | 'assessment' | 'url';

export type FolderT = {
  id: string;
  parentId?: string;
  name: string;
  sequence?: number;
  type: FolderTypeT;
  children?: FolderT[];
  activitySettingName?: string | null;
  activitySettingRecommendedUse?: keyof typeof RecommendedUseEnum | null;
  activitySettingVisibility?: boolean | null;
};

export type FolderMoveDirectionT = 'up' | 'double-up' | 'down' | 'double-down';

export const addParentIdToFolders = (nodes: FolderT) => {
  return {
    ...nodes,
    children: getChildren(nodes.children, nodes.id),
  };

  function getChildren(
    children?: FolderT[],
    id?: string
  ): FolderT[] | undefined {
    if (children) {
      return children.map((child) => ({
        ...child,
        parentId: id!,
        children: getChildren(child.children, child.id),
      }));
    }
    return;
  }
};

export function getNodeById(nodes: FolderT, id: string) {
  if (nodes.id === id) {
    return nodes;
  }
  let result = null;
  nodes.children?.forEach?.((node) => {
    if (getNodeById(node, id)) {
      result = getNodeById(node, id);
    }
  });
  return result;
}

export function foldersForDropdown({ id, name, children }: FolderT) {
  const step = 0;
  const options = [];

  options.push({
    label: name,
    value: id,
    step,
  });
  getChildren(step + 1, children);
  return options;

  function getChildren(step: number, children?: FolderT[]): void {
    if (children) {
      children.forEach(({ id, name, type, children }) => {
        if (type === 'folder') {
          options.push({
            label: name,
            value: id,
            step,
          });
        }

        if (children) {
          getChildren(step + 1, children);
        }
      });
    }
  }
}

const orderByDirection = {
  up: (position: number) => (position ? position - 1 : 0),
  'double-up': () => 0,
  down: (position: number, length: number) =>
    position + 1 < length ? position + 1 : length - 1,
  'double-down': (_: unknown, length: number) => length,
};

class FolderTree {
  moveFolderItem(
    nodes: FolderT,
    selected: string[],
    direction: FolderMoveDirectionT,
    updatedNodes: TemplateNodeOrderT[]
  ): FolderT {
    const childrens = nodes.children;

    if (!childrens) return nodes;

    const hasSelected = childrens.some(({ id }) => selected.includes(id));

    if (hasSelected) {
      // TODO: rewrite with reduce & without .splice()
      const result = childrens.filter((node) => !selected.includes(node.id));
      const needReverse = ['double-up'].includes(direction);
      const nodesForInsert = needReverse ? childrens.reverse() : childrens;
      let countOfSelected = 0;

      nodesForInsert?.forEach?.((node, index) => {
        if (selected.includes(node.id)) {
          const isTopItem = countOfSelected++ === index;
          let startIndex = orderByDirection[direction](index, childrens.length);
          if (isTopItem && direction === 'up') {
            startIndex = index;
          }
          result.splice(startIndex, 0, node);
        }
      });

      // update all sequence values of the children
      result.forEach((node, index) => {
        updatedNodes.push({
          id: node.id,
          sequence: index + 1,
        });
      });
      return { ...nodes, children: result };
    }

    return {
      ...nodes,
      children: nodes.children?.map((node) =>
        this.moveFolderItem(node, selected, direction, updatedNodes)
      ),
    };
  }

  selectFolderItem(
    folders: FolderT,
    selected: string[],
    checked: boolean,
    nodes: FolderT
  ) {
    const topLevel = folders.children!.map(({ id }) => id);
    const isTop = topLevel.find((item) => item === nodes.id);
    const allNode = this.getChildById(folders, nodes.id);

    const array = checked
      ? isTop
        ? [...allNode]
        : [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    return array.filter((v, i) => array.indexOf(v) === i);
  }

  addFolderItem(folders: FolderT, file: Omit<FolderT, 'children'>): FolderT {
    if (folders.id === file.parentId) {
      return {
        ...folders,
        children: [...(folders.children ?? []), file],
      };
    }

    return {
      ...folders,
      children: folders.children?.map((item) => this.addFolderItem(item, file)),
    };
  }

  addFolderItems(
    initialFolders: FolderT,
    files: Omit<FolderT, 'children'>[]
  ): FolderT {
    return files.reduce((folders: FolderT, file) => {
      if (folders.id === file.parentId) {
        return {
          ...folders,
          children: [...(folders.children ?? []), file],
        };
      }

      return {
        ...folders,
        children: folders.children?.map((item) =>
          this.addFolderItem(item, file)
        ),
      };
    }, initialFolders);
  }

  removeFolderItem(folders: FolderT, file: Omit<FolderT, 'children'>): FolderT {
    if (folders.id === file.parentId) {
      return {
        ...folders,
        children: folders.children?.filter((item) => item.id !== file.id),
      };
    }

    return {
      ...folders,
      children: folders.children?.map((item) =>
        this.removeFolderItem(item, file)
      ),
    };
  }

  expandFolderItem(
    folders: FolderT,
    selected: string[],
    expanded: string[],
    nodeId: string[]
  ) {
    const topLevel = folders.children!.map(({ id }) => id);
    const topLevelItems = topLevel.filter((item) => nodeId.includes(item));
    const severalTopFoldersSelected =
      topLevel.filter(
        (item) => nodeId.includes(item) || selected.includes(item)
      ).length > 1;
    const isSeveralTopFolders =
      topLevelItems.length > 1 || severalTopFoldersSelected;

    if (isSeveralTopFolders) {
      const openedTopLevel = topLevelItems.filter(
        (item) => !expanded.includes(item)
      );
      return { selected: [], expanded: openedTopLevel };
    }

    const isCloseFolder = !topLevelItems.length;
    if (isCloseFolder) {
      return { selected: [], expanded: [] };
    } else {
      const isOpenNewFolderFromOther = topLevelItems.length === nodeId.length;
      let selected;
      if (isOpenNewFolderFromOther && severalTopFoldersSelected) {
        selected = [];
      }
      return { selected, expanded: nodeId };
    }
  }

  computeCanReorganize(folders: FolderT, selected: string[]) {
    if (!selected.length) return false;

    const selectedLevels = new Set();
    let hasUnFilledSubFolders = false;

    const runAtNodes = (nodes: FolderT) => {
      nodes?.children?.forEach((node) => {
        const isFolder = node.type === 'folder';
        const isSelected = selected.includes(node.id);
        isSelected && selectedLevels.add(node.parentId);

        if (!isFolder) return;

        if (isSelected) {
          // if selected folder
          const allNodes = this.getChildById(nodes, node.id);
          const isFullSelected = allNodes.every((node) =>
            selected.includes(node)
          );
          if (!isFullSelected) {
            hasUnFilledSubFolders = true;
          }
        } else {
          // if unselected folder
          runAtNodes(node);
        }
      });
    };
    runAtNodes(folders);
    const isValid = !hasUnFilledSubFolders && selectedLevels.size === 1;
    return isValid;
  }

  getChildById(node: FolderT, id: string) {
    let array: string[] = [];

    function getAllChild(nodes: FolderT | null) {
      if (!nodes) return [];
      array.push(nodes.id);
      nodes.children?.forEach?.((node) => {
        array = [...array, ...getAllChild(node)];
        array = array.filter((v, i) => array.indexOf(v) === i);
      });
      return array;
    }

    return getAllChild(getNodeById(node, id));
  }
}

const folderTree = new FolderTree();

export default folderTree;
