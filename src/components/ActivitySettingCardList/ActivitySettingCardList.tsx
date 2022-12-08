import { Grid } from '@mui/material';
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import ActivitySettingCard from '../ActivitySettingCard';
import { ActivitySettingCardT } from '../ActivitySettingCard/ActivitySettingCard';

export type CardListPropsT = {
  checkedId: string;
  cards: ActivitySettingCardT[];
  onChecked: SwitchBaseProps['onChange'];
  onDelete: (id: string) => void;
};

const CardList = ({
  cards,
  checkedId,
  onChecked,
  onDelete,
}: CardListPropsT): JSX.Element => {
  return (
    <Grid container flexDirection="column" spacing={2}>
      {cards.map((card) => (
        <Grid item key={card.id}>
          <ActivitySettingCard
            cardInfo={card}
            checked={checkedId === card.id}
            onChecked={onChecked}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
