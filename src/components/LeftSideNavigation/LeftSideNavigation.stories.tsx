import React, { useState } from 'react';

import LeftSideNavigation, { SectionNavT } from './LeftSideNavigation';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { sampleOptions } from './sampleOptions';
import { Button } from '@mui/material';

export default {
  title: 'Component/LeftSideNavigation',
  component: LeftSideNavigation,
} as ComponentMeta<typeof LeftSideNavigation>;

const Template: ComponentStory<typeof LeftSideNavigation> = () => {
  const [sections, setSections] = useState<SectionNavT[]>(sampleOptions);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [keywordSearch, setKeywordSearch] = useState<string>('');

  const onSelectHandle = (idx: number, value: string) => {
    setSections((prev) => [
      ...prev.slice(0, idx),
      { ...prev[idx], selectedValue: value },
      ...prev.slice(idx + 1),
    ]);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const openHandler = () => {
    setOpen(true);
  };

  const keywordSearchHandler = (val: string) => {
    setKeywordSearch(val);
  };

  return (
    <>
      {isOpen ? (
        <LeftSideNavigation
          title={'Resource Structure'}
          sections={sections}
          onApply={() => {}}
          onSelect={onSelectHandle}
          onClose={closeHandler}
          keywordSearch={keywordSearch}
          setKeywordSearch={keywordSearchHandler}
        />
      ) : (
        <Button onClick={openHandler} color="primary">
          Open
        </Button>
      )}
    </>
  );
};

export const View = Template.bind({});
