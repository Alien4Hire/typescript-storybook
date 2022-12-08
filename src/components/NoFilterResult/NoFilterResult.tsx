import {
  Container,
  ImageContainer,
  DescriptionContainer,
  Heading,
  Description,
} from './NoFilterResult.styles';
import { theme } from '../../theme';
const NoFilterResultImage = '/NoFilterResult.png';

const NoFilterResult = () => {
  return (
    <Container theme={theme}>
      <ImageContainer>
        <img src={NoFilterResultImage} alt="No Filter Result"></img>
      </ImageContainer>
      <DescriptionContainer>
        <Heading>No items matched your criteria.</Heading>
        <Description>Double check your filters and try again.</Description>
      </DescriptionContainer>
    </Container>
  );
};

export default NoFilterResult;
