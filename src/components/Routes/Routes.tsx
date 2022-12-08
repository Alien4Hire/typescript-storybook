import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getConfigAsync } from '../../app/reducers/config/configSlice';
import { store } from '../../app/store';
import Login, { loginPathName } from '../Pages/LoginPage';
import Wrapper from '../Wrapper/Wrapper';
import ProtectedRoutesHelper from './ProtectedRoutesHelper';

// Get NON-sensitive config needed for client
store.dispatch(getConfigAsync());

// Pages / Chunks to create
const Folder = lazy(() => import('../Pages/FolderPage'));
const Templates = lazy(() => import('../Pages/TemplatesPage'));
const CreateTemplate = lazy(() => import('../Pages/TemplatesPage/TemplateAdd'));
const EditTemplate = lazy(() => import('../Pages/TemplatesPage/TemplateEdit'));
const CopyTemplate = lazy(() => import('../Pages/TemplatesPage/TemplateCopy'));
const CreateNewVersionTemplate = lazy(
  () => import('../Pages/TemplatesPage/TemplateNewVersion')
);
const ActivitySettings = lazy(() => import('../Pages/ActivitySettingsPage'));
const Search = lazy(() => import('../Pages/SearchPage'));

const protectedRoutes = [
  {
    Element: Folder,
    path: '/templates/:templateId/activities/:templateVersionId',
    sidebarVisible: true,
  },
  {
    Element: ActivitySettings,
    path: '/templates/:templateId/activity-settings/:templateVersionId',
    sidebarVisible: false,
  },
  {
    Element: Search,
    path: '/templates/:templateId/search/:templateVersionId',
    sidebarVisible: true,
  },
  { Element: Templates, path: '/templates', sidebarVisible: false },
  { Element: CreateTemplate, path: '/templates/create', sidebarVisible: false },
  {
    Element: EditTemplate,
    path: '/templates/:templateId/edit/:templateVersionId',
    sidebarVisible: false,
  },
  {
    Element: CopyTemplate,
    path: '/templates/:templateId/copy/:templateVersionId',
    sidebarVisible: false,
  },
  {
    Element: CreateNewVersionTemplate,
    path: '/templates/:templateId/version/:templateVersionId',
    sidebarVisible: false,
  },
];

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route key={loginPathName} path={loginPathName} element={<Login />} />
        {protectedRoutes.map(({ Element, path, sidebarVisible }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoutesHelper>
                <Wrapper sidebarVisible={sidebarVisible}>
                  <Element />
                </Wrapper>
              </ProtectedRoutesHelper>
            }
          />
        ))}

        <Route path="/" element={<Navigate to="/templates" replace={true} />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
