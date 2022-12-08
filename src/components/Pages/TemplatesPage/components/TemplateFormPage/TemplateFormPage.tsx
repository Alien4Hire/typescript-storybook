import React, { ChangeEvent, useMemo, useState, SyntheticEvent } from 'react';
import {
  Autocomplete,
  Button,
  CircularProgress,
  SelectChangeEvent,
  Typography,
  TextField,
} from '@mui/material';
import {
  TemplateRequestT,
  ProductTypeEnum,
} from '../../../../../../../app/types/templates';
import Select from '../../../../Select';
import RadioButtonsGroup from '../../../../RadioButtonsGroup';
import InputField from '../../../../InputField';
import { productTypes } from '../../sampleData';

import {
  Wrapper,
  Spacer,
  TwoColumnsDiv,
  ActionButtonsDiv,
} from './TemplateFormPage.css';
import { theme } from '../../../../../theme';
import { useGetLearningObjectivesQuery } from '../../../../../app/reducers/learningObjectives/learningObjectivesApi';
import { useGetTaxonomiesQuery } from '../../../../../app/reducers/taxonomies/taxonomiesAPI';
import { useGetProductModelsQuery } from '../../../../../app/reducers/productModels/productModelsAPI';

export type MlTemplateFormPagePropsT = {
  template?: TemplateRequestT | undefined;
  onSave?: (t: TemplateRequestT) => void;
  onCancel?: () => void;
  title: string;
  isEdit?: boolean;
  isNewVersion?: boolean;
};

const initTemplate: TemplateRequestT = {
  templateVersionName: '',
  templateName: '',
  description: '',
  productType: 'US',
  productModel: '',
  taxonomyId: 2177,
  learningObjectiveId: '',
  titleType: 'National',
  ebook: '',
  isbn: '',
  bookAuthor: '',
};

const TemplateFormPage = ({
  template,
  onSave,
  onCancel,
  title,
  isEdit = false,
  isNewVersion = false,
}: MlTemplateFormPagePropsT) => {
  const [data, setData] = useState<TemplateRequestT>(template || initTemplate);
  const { data: productModelsAPIResponse = [], isLoading: pmLoading } =
    useGetProductModelsQuery(undefined);
  const { data: learningObjectivesAPIResponse = [], isLoading: loLoading } =
    useGetLearningObjectivesQuery(undefined);
  const { data: taxonomiesAPIResponse = [], isLoading: taxonomyLoading } =
    useGetTaxonomiesQuery(undefined);

  const learningObjectives = useMemo(() => {
    return learningObjectivesAPIResponse.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [learningObjectivesAPIResponse]);

  const isValid = () => {
    if (!data.templateVersionName) {
      return false;
    }
    if (!data.bookAuthor) {
      return false;
    }
    return true;
  };

  const taxonomies = useMemo(() => {
    return taxonomiesAPIResponse.map((taxonomy) => ({
      value: taxonomy.id,
      label: taxonomy.name,
    }));
  }, [taxonomiesAPIResponse]);

  const productModels = useMemo(
    () =>
      productModelsAPIResponse.map((e) => ({
        label: e.name,
        value: e.id,
      })),
    [productModelsAPIResponse]
  );

  const getTaxonomyObjectFromId = (taxonomyId?: number) =>
    taxonomies.find((e) => e.value === taxonomyId || taxonomies[0]);

  const getLOObjectFromId = (learningObjectiveId?: string) =>
    learningObjectives.find((e) => e.value === learningObjectiveId) ||
    learningObjectives[0];

  const getFullTitle = () => {
    let fullTitle = `${title} ${template?.templateVersionName}`;

    if (isNewVersion) {
      fullTitle =
        fullTitle +
        ` (${template?.templateVersionLabel}v - ShortId: ${template?.templateVersionShortId})`;
    }
    return fullTitle;
  };

  if (pmLoading || loLoading || taxonomyLoading) {
    return <CircularProgress />;
  }

  return (
    <Wrapper theme={theme}>
      {template && template.templateId ? (
        <Typography variant="title">{getFullTitle()}</Typography>
      ) : (
        <Typography variant="title">{title}</Typography>
      )}

      {/* Template Type section*/}
      <Spacer size={20} />
      <Typography variant="h3">Template Type</Typography>
      <Spacer />
      <Typography variant="textSmall" sx={{ color: theme.palette?.gray?.dark }}>
        Product Model
      </Typography>
      <Spacer />
      {productModels.length && (
        <Select
          disabled={isEdit || isNewVersion}
          value={data?.productModel ?? ''}
          options={productModels}
          onChange={(e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
            setData({
              ...data,
              productModel: e.target.value as string,
            });
          }}
        />
      )}
      <Spacer size={20} />
      <Typography variant="textSmall" sx={{ color: theme.palette?.gray?.dark }}>
        Product Type
      </Typography>
      <RadioButtonsGroup
        value={data.productType}
        options={productTypes}
        onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
          setData({
            ...data,
            productType: e.target.value as keyof typeof ProductTypeEnum,
          });
        }}
      />

      {/* Template Info section */}
      <Spacer size={25} />
      <Typography variant="h3">Template Info</Typography>
      <Spacer />
      <InputField
        label="Template Name (required)"
        placeholder="Enter Template Name"
        value={data.templateVersionName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setData({
            ...data,
            templateVersionName: e.target.value as string,
          });
        }}
      />
      <Spacer />
      <InputField
        label="Author (required)"
        placeholder="Enter Author"
        value={data.bookAuthor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setData({
            ...data,
            bookAuthor: e.target.value as string,
          });
        }}
      />
      <Spacer />
      <TwoColumnsDiv>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <InputField
            disabled={isNewVersion}
            label="ISBN"
            placeholder="Enter ISBN"
            value={data.isbn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                isbn: e.target.value as string,
              });
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <InputField
            label="E-book Link"
            placeholder="Paste e-book link here"
            value={data.ebook}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                ebook: e.target.value as string,
              });
            }}
          />
        </div>
      </TwoColumnsDiv>
      <Spacer />
      <Typography variant="textSmall" sx={{ color: theme.palette?.gray?.dark }}>
        Taxonomy
      </Typography>
      <Spacer />
      {taxonomies.length && (
        <Autocomplete
          size="small"
          disablePortal
          value={getTaxonomyObjectFromId(data?.taxonomyId)}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          onChange={(e: SyntheticEvent<unknown>, values) => {
            setData({
              ...data,
              taxonomyId: values?.value as number,
            });
          }}
          options={taxonomies}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            );
          }}
        />
      )}
      <Spacer />
      <Typography variant="textSmall" sx={{ color: theme.palette?.gray?.dark }}>
        Learning Objective collection
      </Typography>
      <Spacer />
      {learningObjectives.length && (
        <Autocomplete
          disablePortal
          size="small"
          value={getLOObjectFromId(data?.learningObjectiveId)}
          isOptionEqualToValue={(option, value) =>
            option.value === value?.value
          }
          onChange={(e: SyntheticEvent<unknown>, values) => {
            setData({
              ...data,
              learningObjectiveId: values?.value as string,
            });
          }}
          options={learningObjectives}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            );
          }}
        />
      )}

      <Spacer size={30} />
      <ActionButtonsDiv>
        <div style={{ marginRight: '10px' }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onCancel && onCancel()}
            test-id="cancel-button"
            data-testid="cancel-button"
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (onSave && isValid()) onSave(data);
            }}
            test-id="save-button"
            data-testid="save-button"
          >
            {template && template.templateId
              ? 'Save Changes'
              : 'Create Template'}
          </Button>
        </div>
      </ActionButtonsDiv>
    </Wrapper>
  );
};
export default TemplateFormPage;
