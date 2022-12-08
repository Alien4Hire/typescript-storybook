import TemplateFormPage from '../components/TemplateFormPage/TemplateFormPage';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from '../../../../app/reducers/templates/templateAPI';
import { TemplateRequestT } from '../../../../../../app/types/templates';

const TemplateEdit = () => {
  const { templateId, templateVersionId } = useParams();
  const navigate = useNavigate();
  const { data: template, isLoading } = useGetTemplateQuery({
    templateId,
    templateVersionId,
  });
  const [updateTemplate] = useUpdateTemplateMutation();

  const handleSave = async (template: TemplateRequestT) => {
    const editedTemplate = {
      templateVersionName: template.templateVersionName,
      templateName: template.templateName,
      description: template.description,
      learningObjectiveId: template.learningObjectiveId,
      taxonomyId: template.taxonomyId,
      isbn: template.isbn,
      ebook: template.ebook,
      bookAuthor: template.bookAuthor,
      productModel: template.productModel,
      productType: template.productType,
      titleType: template.titleType,
      templateId: template.templateId,
      templateVersionId: template.templateVersionId,
    };
    await updateTemplate(editedTemplate);
    navigate('/templates');
  };
  const handleCancel = () => {
    navigate('/templates');
  };

  return (
    <>
      {isLoading && <div>is loading...</div>}
      {template && (
        <TemplateFormPage
          template={template}
          onSave={handleSave}
          onCancel={handleCancel}
          isEdit
          title="Edit Template:"
        />
      )}
    </>
  );
};

export default TemplateEdit;
