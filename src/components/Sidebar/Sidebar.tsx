import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { List } from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import { getSideBarStatus } from '../../app/reducers/appSlice/appSlice';

import {
  Line,
  StyledDrawer,
  StyledHome,
  StyledSearch,
  StyledListIcon,
  StyledCog,
  StyledFile,
  StyledButton,
} from './Sidebar.styles';
import { theme } from '../../theme';

export type MlSidebarPropsT = {
  disabled?: boolean;
  active?: number;
};

type ListItemPropsT = {
  to: string;
  children: JSX.Element;
  title?: string;
};

const Sidebar = ({ disabled = false }: MlSidebarPropsT) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarStatus = useAppSelector(getSideBarStatus);

  const ListItem = ({ to, children, title }: ListItemPropsT) => (
    <StyledButton
      onClick={() => navigate(to)}
      active={to === location.pathname ? 1 : 0}
      variant="text"
      disabled={disabled}
      theme={theme}
      title={title}
      aria-label={`button ${title}`}
    >
      {children}
    </StyledButton>
  );
  // const template = useAppSelector(selectCurrentTemplate);
  const { templateId, templateVersionId } = useParams();

  return (
    <StyledDrawer
      open={sideBarStatus}
      theme={theme}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem to="/">
          <StyledHome title="Template List" />
        </ListItem>
        <Line theme={theme} />
        <ListItem to={`/templates/${templateId}/search/${templateVersionId}`}>
          <StyledSearch title="Search Content" />
        </ListItem>
        <ListItem
          to={`/templates/${templateId}/activities/${templateVersionId}`}
        >
          <StyledListIcon title="Resources" />
        </ListItem>
        <ListItem title="Project Plan" to="/templates">
          <StyledFile />
        </ListItem>
        <Line theme={theme} />
        <ListItem to={`/templates/${templateId}/edit/${templateVersionId}`}>
          <StyledCog title="Edit Settings" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
