import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '../../setupTests';
import TemplateListItem, { TemplateActions } from './TemplateListItem';
import { templates } from '../Pages/TemplatesPage/sampleData';
import { MemoryRouter as Router } from 'react-router-dom';

const baseProps = {
  template: templates[0],
  onCopyClick: jest.fn(),
  onSettingClick: jest.fn(),
};

const renderComponent = () => {
  return render(
    <Router>
      <TemplateListItem {...baseProps} />
    </Router>
  );
};

describe('<TemplateListItem />', () => {
  it('renders correctly', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});

const actionsProps = {
  actions: {
    onCopyClick: jest.fn(),
    onSettingClick: jest.fn(),
    onNewVersionClick: jest.fn(),
  },
  version: templates[0].versions[0],
};

const renderTemplateActionsComponent = () => {
  return render(
    <Router>
      <TemplateActions {...actionsProps} />
    </Router>
  );
};

describe('<TemplateActions />', () => {
  it('renders correctly', () => {
    const view = renderTemplateActionsComponent();
    expect(view).toMatchSnapshot();
  });
  it('should has a drop down contex menu', () => {
    renderTemplateActionsComponent();
    const menuButton = screen.getByTestId('contextMenu');

    fireEvent.click(menuButton);

    const dropDownMenu = screen.getByTestId('templateDropDown');
    expect(dropDownMenu).toBeTruthy();
  });
  it('should has a drop down contex menu and click on edit template', () => {
    renderTemplateActionsComponent();
    const menuButton = screen.getByTestId('contextMenu');

    fireEvent.click(menuButton);

    const dropDownMenu = screen.getByTestId('templateDropDown');

    expect(dropDownMenu).toBeTruthy();
    expect(actionsProps.actions.onSettingClick).toBeCalledTimes(0);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(actionsProps.actions.onSettingClick).toBeCalledTimes(1);
  });
  it('should has a drop down contex menu and click on copy template', () => {
    renderTemplateActionsComponent();
    const menuButton = screen.getByTestId('contextMenu');

    fireEvent.click(menuButton);

    const dropDownMenu = screen.getByTestId('templateDropDown');

    expect(dropDownMenu).toBeTruthy();
    expect(actionsProps.actions.onCopyClick).toBeCalledTimes(0);

    const copyButton = screen.getByText('Copy Template');
    fireEvent.click(copyButton);

    expect(actionsProps.actions.onCopyClick).toBeCalledTimes(1);
  });
  it('should has a drop down contex menu and click on create new version from template', () => {
    renderTemplateActionsComponent();
    const menuButton = screen.getByTestId('contextMenu');

    fireEvent.click(menuButton);

    const dropDownMenu = screen.getByTestId('templateDropDown');

    expect(dropDownMenu).toBeTruthy();
    expect(actionsProps.actions.onNewVersionClick).toBeCalledTimes(0);

    const copyButton = screen.getByText('Create New Version');
    fireEvent.click(copyButton);

    expect(actionsProps.actions.onNewVersionClick).toBeCalledTimes(1);
  });
});
