import {
  Container,
  ImageContainer,
  DescriptionContainer,
  Heading,
  Description,
} from './NoResult.styles';
import { theme } from '../../theme';
const SearchQueryImage = '/searchquery.png'

const NoResult = () => {
  return (
    <Container theme={theme}>
      <ImageContainer theme={theme}>
        <img src={SearchQueryImage} alt='Empty results list'></img>
      </ImageContainer>
      <DescriptionContainer>
        <Heading>
          Filter and select content to add to your Resource Structure.
        </Heading>
        <Description>
          After you add content to your Resource Structure, you can organize it
          and add it to the Pre-Built Course Content.
        </Description>
      </DescriptionContainer>
    </Container>
  );
};

export default NoResult;
