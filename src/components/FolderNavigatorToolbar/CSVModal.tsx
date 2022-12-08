import React from 'react';

import { Typography, Box, Link } from '@mui/material';
import { useCSVReader, useCSVDownloader } from 'react-papaparse';

import generateUuid from '../../util/uuid';
import { ReactComponent as DownloadIcon } from '../../icons/download.svg';
import { ReactComponent as LinkIcon } from '../../icons/link.svg';
import { Modal } from '../Modal/Modal';
import {
  CsvModalBackdrop,
  UploadListItem,
  UploadButton,
  DownloadTemplateWrapper,
} from './styles';
import { theme } from '../../theme';

export type UploadT = {
  title: string;
  url: string;
};

export type CsvModalT = {
  isCSVModalOpen: boolean;
  onCSVModalClose: () => void;
  onAddActivities: () => void;
  uploadList: UploadT[];
  setUploadList: (uploadList: UploadT[]) => void;
};

const CSV_TEMPLATE_DATA = [
  {
    Title: 'Example Activity 1',
    URL: 'http://example-1.com',
  },
  {
    Title: 'Example Activity 2',
    URL: 'http://example-2.com',
  },
  {
    Title: 'Example Activity 3',
    URL: 'http://example-3.com',
  },
];

const CSVModal = ({
  isCSVModalOpen,
  onCSVModalClose,
  onAddActivities,
  uploadList,
  setUploadList,
}: CsvModalT) => {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader } = useCSVDownloader();

  const handleUploadCSV = (results: string[][]) => {
    const formattedResult: UploadT[] = [];
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      if (
        element[0].toLocaleLowerCase() !== 'title' &&
        element[1].toLocaleLowerCase() !== 'url'
      ) {
        formattedResult.push({ title: element[0], url: element[1] });
      }
    }
    setUploadList(formattedResult);
  };

  const handleReuploadCSV = () => {
    setUploadList([]);
  };

  return (
    <Modal
      title={'Add URL activities'}
      open={isCSVModalOpen}
      actions={
        uploadList.length > 0
          ? [
              {
                label: 'Reupload CSV',
                variant: 'outlined',
                color: 'primary',
                onClick: () => handleReuploadCSV(),
              },
              {
                label: 'Add Activities',
                variant: 'contained',
                color: 'primary',
                onClick: () => onAddActivities(),
              },
            ]
          : []
      }
      onClose={() => onCSVModalClose()}
    >
      {uploadList.length > 0 ? (
        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: 2 }}
            variant="subtitle2"
          >
            Previewing {uploadList.length} activities
          </Typography>
          <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
            {uploadList.map((item) => (
              <UploadListItem theme={theme} key={generateUuid()}>
                <LinkIcon />
                <Link
                  underline="none"
                  target="_blank"
                  href={item.url}
                  rel="noreferrer"
                  sx={{ marginLeft: 1 }}
                >
                  {item.title}
                </Link>
              </UploadListItem>
            ))}
          </Box>
        </Box>
      ) : (
        <CSVReader
          onUploadAccepted={(results: any) => {
            handleUploadCSV(results.data);
          }}
        >
          {({ getRootProps }: any) => (
            <>
              <CsvModalBackdrop>
                <Typography variant="body1">
                  Upload a CSV of URLs and their titles.
                </Typography>
                <UploadButton
                  data-testid="upload-button"
                  variant="contained"
                  {...getRootProps()}
                >
                  Upload .csv
                </UploadButton>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, color: theme.palette.gray.dark }}
                >
                  Accepted file types: csv
                </Typography>
                <CSVDownloader filename="template" data={CSV_TEMPLATE_DATA}>
                  <DownloadTemplateWrapper>
                    <DownloadIcon color={theme.palette.primary.main} />
                    <Typography
                      data-testid="download-link"
                      variant="body2"
                      sx={{
                        marginLeft: 1.5,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Download template
                    </Typography>
                  </DownloadTemplateWrapper>
                </CSVDownloader>
              </CsvModalBackdrop>
            </>
          )}
        </CSVReader>
      )}
    </Modal>
  );
};

export default CSVModal;
