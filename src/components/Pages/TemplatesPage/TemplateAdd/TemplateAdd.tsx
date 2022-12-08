import TemplateFormPage from '../components/TemplateFormPage/TemplateFormPage';
import { useAddTemplateMutation } from '../../../../app/reducers/templates/templateAPI';
import { TemplateRequestT } from '../../../../../../app/types/templates';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../app/reducers/login/loginSlice';

const TemplateAdd = () => {
  const user = useAppSelector(selectUser);
  const [addTemplate] = useAddTemplateMutation();
  const navigate = useNavigate();

  const handleSave = async (template: TemplateRequestT) => {
    template.templateVersionCreatedBy = user?.id;
    const { templateId, templateVersionId } = await addTemplate(
      template
    ).unwrap();
    navigate(`/templates/${templateId}/search/${templateVersionId}`);
  };
  const handleCancel = () => navigate('/templates');

  return (
    <TemplateFormPage
      onSave={handleSave}
      onCancel={handleCancel}
      title="Template Setup"
    />
  );
};

export default TemplateAdd;
