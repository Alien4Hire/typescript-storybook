import TemplateFormPage from '../components/TemplateFormPage/TemplateFormPage';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetTemplateQuery,
  useNewVersionTemplateMutation,
} from '../../../../app/reducers/templates/templateAPI';
import { TemplateRequestT } from '../../../../../../app/types/templates';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../app/reducers/login/loginSlice';

const TemplateNewVersion = () => {
  const { templateId, templateVersionId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { data: template, isLoading } = useGetTemplateQuery({
    templateId,
    templateVersionId,
  });
  const [newVersionTemplate] = useNewVersionTemplateMutation();

  const handleSave = async (template: TemplateRequestT) => {
    const newVersionTemplateData = {
      templateVersionName: template.templateVersionName,
      templateName: template.templateName,
      description: template.description,
      templateVersionCreatedBy: user?.id,
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

    try {
      await newVersionTemplate(newVersionTemplateData);
      navigate('/templates');
    } catch (e) {
      console.log(e);
    }
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
          title="Create New Version of "
          isNewVersion={true}
        />
      )}
    </>
  );
};

export default TemplateNewVersion;
