import { FC, ReactNode } from "react";
import Body from "./body";
import Stack from "./stack";
import Button from "./button";
import Box from "./box";

type Props = {
  decrease?: () => void;
  increase?: () => void;
  amount?: ReactNode;
  sheeshAmount?: number;
};

const AmountInput: FC<Props> = ({
  decrease,
  increase,
  amount = 0,
  sheeshAmount = 0,
  ...props
}) => {
  return (
    <Stack
      direction="VERTICAL"
      space={0}
      localStyles={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      {...props}
    >
      <Stack
        direction="HORIZONTAL"
        space={0}
        localStyles={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button
          onClick={() => {
              if(amount!=0){
               decrease && decrease()
              }
          }}
          size="M"
          variant="SECONDARY"
          href="Decrease"
          target="_blank"
          localStyles={{
            width: 50,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          -
        </Button>
        <Box
          localStyles={{
            borderTop: "1px solid var(--button-border)",
            borderBottom: "1px solid var(--button-border)",
            padding: 12,
          }}
        >
          <Body size="M" localStyles={{ lineHeight: 1 }}>
            {amount}
          </Body>
        </Box>
        <Button
          onClick={increase}
          size="M"
          variant="SECONDARY"
          href="Increase"
          target="_blank"
          localStyles={{
            width: 50,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }}
        >
          +
        </Button>
      </Stack>
      <Body size="S" localStyles={{ lineHeight: 1, marginTop: "var(--scale-24)" }}>
        {`Total: $${sheeshAmount} (SHS)`}
      </Body>
    </Stack>
  );
};

export default AmountInput;