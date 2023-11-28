import { FC, useState,useEffect } from "react";
import Button from "../components/button";
import Stack from "../components/stack";
import Grid from "../components/grid";
import Banner from "../components/banner";
import PFP from "../assets/pfp/serum.png";
import Card from "../components/card";
import GenesisPFP from "../assets/pfp/genesis.png";
import DegenHoursPFP from "../assets/pfp/degenhours.png";
import FrogtoberPFP from "../assets/pfp/frogtober.png";
import LegendsPFP from "../assets/pfp/legends.png";
import MutantsPFP from "../assets/pfp/mutants.png";
import SerumPFP from "../assets/pfp/serum.png";
import ElementalsPFP from "../assets/pfp/elementals.png";
import Dialog from "../components/dialog";
import Body from "../components/body";
import DialogHeader from "../assets/dialog-header.png";
import AmountInput from "../components/amountInput";
import { sheeshTokenABI, sheeshTokenAddress } from "./SheeshToken";
import { serumAbi, serumAddress } from "./SerumToken";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";

export const Home = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [serumAmount, setSerumAmount] = useState(0);
  const [sheeshAmount, setSheeshAmount] = useState(0);

  useEffect(() => {
    const EXCHANGE_RATE = 420000000; // The exchange rate
    const newSheeshAmount = serumAmount * EXCHANGE_RATE;
    setSheeshAmount(newSheeshAmount);
  }, [serumAmount]);
  
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // setWalletConnected(true);
        let signer = provider.getSigner();
        let address_ = signer.getAddress();
        // console.log({ signer, address_ });
        return signer;
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  async function handleBuy() {
    if (serumAmount <= 0) {
      alert("Select one or more serums");
      return 0;
    }
    let signer = await connectWallet();
    if (!signer) {
      return 0;
    }
    let adr = await signer.getAddress();
    console.log({ signer });

    const sheeshContract = new ethers.Contract(
      sheeshTokenAddress,
      sheeshTokenABI,
      signer
    );

    console.log({ sheeshContract });
    const serumContract = new ethers.Contract(serumAddress, serumAbi, signer);
    console.log({ serumContract });
    try {
      console.log("approving....", serumAddress);
      let approved = await sheeshContract.allowance(adr, serumAddress);
      approved = parseInt(approved);
      if (approved < parseInt(parseEther(420000000 * serumAmount + ""))) {
        let txx = await sheeshContract.approve(
          serumAddress,
          parseEther("10000000000000000000000000000000000000000000000000000000")
        );
        await txx.wait();
      }

      alert("Please confirm your serum purchase...");
      let txx = await serumContract.purchaseSerum(1, serumAmount);
      await txx.wait();
      alert("Purchased serum Successfully 🎉");
      // fetchUnstakedInfo();
    } catch (error) {
      alert("Error in Purchasing....");
    }
    setIsRevealed(!isRevealed);
  }
  return (
    <>
      <Stack
        direction="VERTICAL"
        localStyles={{
          marginTop: 86,
          marginBottom: 94,
          "@media (min-width: 1080px)": { marginBottom: 50 },
        }}
      >
        {/* <Banner
          pfp={PFP}
          heading="PAYC Legends"
          description="Elvis Presley via the Rockabilly Hall of Fame Museum"
        >
          <Button
            size="M"
            variant="PRIMARY"
            as="a"
            href="https://hub.auraexchange.org/collection/ethereum/0x0f4186a53774f4c73cb90f278d26094cce765720"
            target="_blank"
          >
            View Collection
          </Button>
        </Banner> */}

        <Banner
          pfp={PFP}
          heading="Elemental Serum"
          description="Mint Serum's for the upcoming Elemental collection"
        >
            <Button
              size="M"
              variant="PRIMARY"
              href="..."
              target="_blank"
              onClick={() => setIsRevealed(!isRevealed)}
            >
              Buy Serum
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://burn.pepeapeyachtclub.com"
              target="_blank"
            >
              Burn 5 Mutants 🔥
            </Button>
        </Banner>

        <Grid
          columns={1}
          localStyles={{
            padding: "var(--scale-24)",
            gap: "var(--scale-24)",
            gridTemplateColumns: "1fr",
            "@media (min-width: 600px)": {
              padding: "var(--scale-48)",
              gap: "var(--scale-48)",
            },
            "@media (min-width: 800px)": {
              gridTemplateColumns: "1fr 1fr",
            },
            "@media (min-width: 1200px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            },
            "@media (min-width: 2000px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            },
          }}
        >
          <Card
            heading="Genesis"
            description="Collection Size • 7,777"
            pfp={GenesisPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/Ethereum/0x2d0d57d004f82e9f4471caa8b9f8b1965a814154"
              target="_blank"
            >
              View Collection
            </Button>
            <Button as="a" size="M" variant="PRIMARY" href="/portals">
              View Portals
            </Button>
          </Card>
          <Card
            heading="Degen Hours"
            description={`Untransferrable & Secure`}
            pfp={DegenHoursPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x577c0379ba192c3293f207b40327f34d18f9e7e3"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://degen.pepeapeyachtclub.com"
              target="_blank"
            >
              Select Portal
            </Button>
          </Card>
          <Card
            heading="Frogtober"
            description="Chance to Pull a Rare"
            pfp={FrogtoberPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0xea3a82c8fdd0f7e7fd36a58900ff9aa39995c9ce"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://frogtober.pepeapeyachtclub.com"
              target="_blank"
            >
              Select Portal
            </Button>
          </Card>
          <Card
            heading="Legends"
            description="Past &amp; Present Icons"
            pfp={LegendsPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x0f4186a53774f4c73cb90f278d26094cce765720"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://legends.pepeapeyachtclub.com"
              target="_blank"
            >
              Select Portal
            </Button>
          </Card>
          <Card
            heading="Mutants"
            description="Community-Designed"
            pfp={MutantsPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x0802f7a7c48426e972a30aaab3c2f35c14a35bc8"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://burn.pepeapeyachtclub.com"
              target="_blank"
            >
              Burn 5 Mutants 🔥
            </Button>
          </Card>
          <Card
            heading="Elemental Serum"
            description="PAYC Serums powered by $SHS"
            pfp={SerumPFP}
            direction="VERTICAL"
          >
            {/* <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://opensea.io/collection/paycserums"
              target="_blank"
            >
              View Collection
            </Button> */}
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://burn.pepeapeyachtclub.com"
              target="_blank"
            >
              Burn 5 Mutants 🔥
            </Button>
            <Button
              size="M"
              variant="PRIMARY"
              href="..."
              target="_blank"
              onClick={() => setIsRevealed(!isRevealed)}
            >
              Buy with Sheesh
            </Button>
          </Card>
          <Card
            heading="Elementals"
            description="Coming soon"
            pfp={ElementalsPFP}
            direction="VERTICAL"
          >
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              View Collection
            </Button>
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              Apply Serum
            </Button>
          </Card>

          {/* SERUM DIALOG */}
          {isRevealed && (
            // When live replace the message of "Coming Soon" to "Purchase serums with $SHS".
            // When live uncomment the button.
            <Dialog
              backdropClose={() => setIsRevealed(!isRevealed)}
              image={DialogHeader}
            >
              <Stack
              direction="VERTICAL"
              space={"var(--scale-4)"}
              localStyles={{ justifyContent: "center" }}
              >
                <Body size="L" localStyles={{textAlign: 'center'}} >Buy Elemental Serum</Body>
                <Body size="S" localStyles={{ textAlign: 'center', lineHeight: 1, marginTop: "var(--scale-8)", opacity: .4 }}>
                1 Serum = 420 Million Sheesh
                </Body>
              </Stack>
              <AmountInput
                decrease={(e) => setSerumAmount((prev) => serumAmount - 1)}
                increase={() => setSerumAmount((prev) => prev + 1)}
                amount={serumAmount}
                sheeshAmount={sheeshAmount}
              />
              <Stack
                direction="HORIZONTAL"
                space={"var(--scale-12)"}
                localStyles={{ justifyContent: "center" }}
              >
                <Button
                  size="M"
                  variant="SECONDARY"
                  onClick={() => setIsRevealed((prev) => !prev)}
                  localStyles={{ marginTop: "var(--scale-8)" }}
                >
                  Cancel
                </Button>
                <Button
                  size="M"
                  variant="PRIMARY"
                  onClick={() => handleBuy()}
                  localStyles={{ marginTop: "var(--scale-8)" }}
                >
                  Buy Now
                </Button>
              </Stack>

            </Dialog>
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default Home;
