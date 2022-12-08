import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import {
  TemplateRequestT,
  MlTemplateVersionsT,
} from '../../../../app/types/templates';
import { theme } from '../../theme';
import {
  StyledTableCell,
  StyledTableRow,
  StyledVersionTitleLink,
  styles,
  StyledForwardIcon,
  StyledAuthorModel,
  StyledReleaseLink,
  StyledSettingsIcon,
  StyledItemCopy,
  StyledItemEdit,
} from './TemplateListItem.css';
import { format } from 'date-fns';

import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TemplateActionsT = {
  actions: {
    onCopyClick: (id?: string, templateVersionId?: string) => void;
    onSettingClick: (id?: string, templateVersionId?: string) => void;
    onNewVersionClick: (id?: string, templateVersionId?: string) => void;
  };
  version: TemplateRequestT;
};

export type MlTemplateListItemPropsT = {
  template: MlTemplateVersionsT;
  onCopyClick: (id?: string, templateVersionId?: string) => void;
  onSettingClick: (id?: string, templateVersionId?: string) => void;
};

export const TemplateActions = ({ actions, version }: TemplateActionsT) => {
  const options = [
    {
      label: 'Edit',
      value: 'EDIT_TEMPLATE',
      icon: <StyledSettingsIcon theme={theme} />,
    },
    {
      label: 'Copy Template',
      value: 'COPY_TEMPLATE',
      icon: <StyledItemCopy theme={theme} />,
    },
    {
      label: 'Create New Version',
      value: 'CREATE_NEW_VERSION',
      icon: <StyledItemEdit theme={theme} />,
    },
    {
      label: 'Deploy to Environment',
      value: 'DEPLOY',
      icon: <StyledForwardIcon theme={theme} />,
    },
  ];

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClickMoreMenuItem =
    ({
      templateId,
      templateVersionId,
    }: {
      templateId: string | undefined;
      templateVersionId: string | undefined;
    }) =>
    (value: string) => {
      if (value === 'COPY_TEMPLATE') {
        actions.onCopyClick(templateId, templateVersionId);
      }
      if (value === 'CREATE_NEW_VERSION') {
        actions.onNewVersionClick(templateId, templateVersionId);
      }
      if (value === 'EDIT_TEMPLATE') {
        actions.onSettingClick(templateId, templateVersionId);
      }
    };

  return (
    <>
      <IconButton
        data-testid="contextMenu"
        color="primary"
        aria-label="upload picture"
        component="span"
        style={{ margin: '0 15px 0 auto' }}
        onClick={handleMoreMenuClick}
      >
        <MoreVert color="primary" />
      </IconButton>
      <DropdownMenu
        testId="templateDropDown"
        key={'more_vert'}
        labelColor={theme.palette.aqua.main}
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        options={options}
        onItemClick={handleClickMoreMenuItem({
          templateId: version.templateId,
          templateVersionId: version.templateVersionId,
        })}
        onClose={handleClose}
      />
    </>
  );
};

const TemplateListItem = ({
  template,
  onCopyClick,
  onSettingClick,
}: MlTemplateListItemPropsT) => {
  const navigate = useNavigate();
  const onNewVersionClick = (
    id: string | undefined,
    templateVersionId: string | undefined
  ) => {
    if (id) {
      navigate(`/templates/${id}/version/${templateVersionId}`);
    }
  };

  return (
    <Paper sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StyledAuthorModel theme={theme}>
            Author | PRODUCT MODEL
          </StyledAuthorModel>
        </Grid>
        <Grid item xs={4}>
          <StyledReleaseLink theme={theme}>
            Release Management
          </StyledReleaseLink>
        </Grid>
      </Grid>
      <Typography variant="h2" sx={{ color: theme.palette?.primary?.main }}>
        {template.templateName}
      </Typography>
      <Table sx={{ mt: 1 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell theme={theme}>Version</StyledTableCell>
            <StyledTableCell theme={theme}>Created By</StyledTableCell>
            <StyledTableCell theme={theme}>Last Updated At</StyledTableCell>
            <StyledTableCell theme={theme}>Source</StyledTableCell>
            <StyledTableCell theme={theme}>Template ID</StyledTableCell>
            <StyledTableCell theme={theme}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {template.versions.map(
            (version: TemplateRequestT, rowKey: number) => (
              <StyledTableRow key={rowKey}>
                <StyledTableCell theme={theme}>
                  <StyledVersionTitleLink
                    to={`/templates/${version.templateId}/search/${version.templateVersionId}`}
                  >
                    Version {version.templateVersionLabel}
                  </StyledVersionTitleLink>
                </StyledTableCell>
                <StyledTableCell theme={theme}>
                  {version.templateVersionCreatedBy}
                </StyledTableCell>
                <StyledTableCell theme={theme}>
                  {version.templateVersionUpdatedAt &&
                    format(
                      new Date(version.templateVersionUpdatedAt),
                      'iii, MMM dd, p'
                    )}
                </StyledTableCell>
                <StyledTableCell theme={theme}>
                  {version?.templateVersionSourceShortId ?? ''}
                </StyledTableCell>
                <StyledTableCell theme={theme}>
                  {version.templateVersionShortId}
                </StyledTableCell>
                <StyledTableCell theme={theme}>
                  <TemplateActions
                    actions={{ onCopyClick, onSettingClick, onNewVersionClick }}
                    version={version}
                  />
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TemplateListItem;
