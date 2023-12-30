import { FC } from 'react';
import Button from '../components/button';
import Stack from '../components/stack';
import Grid from '../components/grid';
import Card from '../components/card';
import SOL from '../assets/sheesh/sheesh-sol.jpg';
import ERC from '../assets/sheesh/sheesh-erc.jpg';

export const Sheesh: FC<{}> = () => {

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
            <Card heading="Sheesh SPL" description='A Meme-First Coin • Available on CoinLev' pfp={SOL} direction="HORIZONTAL">
              <Button as="a" size='M' variant="SECONDARY" href='https://raydium.io/swap/?inputCurrency=sol&inputSymbol=ShEEsu&outputCurrency=ShEEsukacNfbBpULD1xtCZKjeMMzvc78xufMDuE3jvB&fixed=in' target="_blank">Buy</Button>
              <Button as="a" size='M' variant='PRIMARY' href='https://www.sheesh.meme' target="_blank">Visit Website</Button>
            </Card>
            <Card heading="Sheesh ERC20" description='Earn $SHS via EngageR' pfp={ERC} direction="HORIZONTAL">
              <Button as="a" size='M' variant="SECONDARY" href='https://app.uniswap.org/tokens/ethereum/0xbb4f3ad7a2cf75d8effc4f6d7bd21d95f06165ca' target="_blank">Buy</Button>
              <Button as="a" size='M' variant='PRIMARY' href='https://www.sheesh.ing' target="_blank">Visit Website</Button>
            </Card>
          </Grid>

      </Stack>
    </>
  );
}

export default Sheesh;
