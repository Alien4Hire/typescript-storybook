import { useEffect, useState } from 'react';
import useDebouncedSearch from '../../../hooks/useDebouncedSearch';
import { Button, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LinearProgress } from '@mui/material';
import { MlTemplateVersionsT } from '../../../../../app/types/templates';
import SearchTextfield from '../../SearchTextfield/SearchTextfield';
import TemplateListItem from '../../TemplateListItem/TemplateListItem';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../../../theme';
import { Wrapper, Header } from './TemplatesPage.css';

export type MlTemplatesPageViewPropsT = {
  templates?: MlTemplateVersionsT[];
  page: number;
  setPage: (page: number) => void;
  altText: string;
  hasMore: boolean;
  onChange: (text: string) => void;
};

const TemplatesPageView = ({
  templates = [],
  page,
  setPage,
  altText,
  hasMore = false,
  onChange,
}: MlTemplatesPageViewPropsT) => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');
  const { debouncedValue } = useDebouncedSearch(text, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handlePageChange: () => void = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  // If searchText changes, start at page 1 for results
  const handleSearch = (searchText: string) => {
    const searchTextChanged = text !== searchText;
    if (searchTextChanged) {
      setPage(1);
    }
    setText(searchText);
  };

  const handleCopyLink = (
    id: string | undefined,
    templateVersionId: string | undefined
  ) => {
    if (id) {
      navigate(`/templates/${id}/copy/${templateVersionId}`);
    }
  };

  const handleEditLink = (
    templateId: string | undefined,
    templateVersionId: string | undefined
  ) => {
    if (templateId) {
      navigate(`/templates/${templateId}/edit/${templateVersionId}`);
    }
  };

  const loader = <LinearProgress />;
  const endMessage = <h4>No more templates found.</h4>;

  return (
    <Wrapper theme={theme}>
      <Typography variant="h1">Template List</Typography>
      <Header>
        <SearchTextfield
          placeholder="Search for a Template"
          onChange={handleSearch}
          onRequestSearch={() => {}}
        />
        <Link to="/templates/create">
          <Button color="primary" variant="contained">
            Create New Template
          </Button>
        </Link>
      </Header>

      <InfiniteScroll
        dataLength={templates.length}
        next={handlePageChange}
        hasMore={hasMore}
        loader={loader}
        endMessage={endMessage}
      >
        {templates.map((t, index) => (
          <TemplateListItem
            key={index}
            template={t}
            onCopyClick={(templateId, templateVersionId) => {
              handleCopyLink(templateId, templateVersionId);
            }}
            onSettingClick={(templateId, templateVersionId) => {
              handleEditLink(templateId, templateVersionId);
            }}
          />
        ))}
      </InfiniteScroll>
    </Wrapper>
  );
};
export default TemplatesPageView;
