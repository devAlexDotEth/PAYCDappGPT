import { FC } from 'react';
import Button from '../components/button';
import Stack from '../components/stack';
import Grid from '../components/grid';
import Card from '../components/card';
import BatmanPFP from '../assets/merch/batman.png';

export const Merch: FC<{}> = () => {

  return (
    <>

      <Stack direction='VERTICAL' localStyles={{marginTop: 86, marginBottom: 94, '@media (min-width: 1080px)': { marginBottom: 50,}}}>

          {/* Portal Tiles */}
          <Grid
            columns={1}
            localStyles={{
              padding: 'var(--scale-24)',
              gap: 'var(--scale-24)',
              gridTemplateColumns: '1fr',
              '@media (min-width: 600px)' :{
                padding: 'var(--scale-48)',
                gap: 'var(--scale-48)',
              },
              '@media (min-width: 800px)' :{
                gridTemplateColumns: '1fr 1fr',
              },
              '@media (min-width: 1200px)' :{
                gridTemplateColumns: '1fr',
              },
            }}>
            <Card heading="Beyond Superstition" description='Merch by PAYCBATMAN' pfp={BatmanPFP} direction="HORIZONTAL">
              <Button as="a" size='M' variant='SECONDARY' href='https://www.beyondsuperstition.com/store' target="_blank">View Store</Button>
              <Button as="a" size='M' variant="PRIMARY" href='https://www.beyondsuperstition.com/contact' target="_blank">Contact Store</Button>
            </Card>
          </Grid>

      </Stack>
    </>
  );
}

export default Merch;
