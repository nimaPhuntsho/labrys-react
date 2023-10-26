import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Card, Box, Text, Image } from "@chakra-ui/react";

export interface Props {
  id: number;
  symbol: string;
  price: number;
  percent_change_1h: number;
  market_cap: number;
  onTokenClick?: () => void;
}

const Token = ({
  id,
  symbol,
  price,
  percent_change_1h,
  market_cap,
  onTokenClick,
}: Props) => {
  //the object has couple of chakra property values
  const theme = {
    color: "#FFFFFF",
    font: "Inter, sans-serif",
  };

  // Separate the price into a more readible format
  function renderPrice(price: number) {
    return price.toLocaleString();
  }

  //add suffix to the market cap (Mn | Bn)
  function renderMarketCap(cap: number) {
    if (cap >= 1e9) return (cap / 1e9).toFixed(2) + " Bn";
    else if (cap >= 1e6) {
      return (cap / 1e6).toFixed(2) + " Mn";
    } else return cap;
  }

  //adds % symbol at the end
  function refactorPercentChange(percent: number) {
    if (percent < 0) {
      return `${(percent * -1).toFixed(2)}`;
    } else return `${percent.toFixed(2)}`;
  }

  return (
    <>
      <Card
        w="366px"
        h="56px"
        bg="#2F2E2E"
        borderRadius="4px"
        position="relative"
        onClick={onTokenClick}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Box position="absolute" w="36px" h="13px" top="21px" left="24px">
          <Text
            fontFamily={theme.font}
            fontWeight="500"
            fontSize="11px"
            lineHeight="13.31px"
            color={theme.color}
          >
            #{id}
          </Text>
        </Box>
        <Box position="absolute" w="28px" h="28px" top="14px" left="61px">
          <Image
            src={percent_change_1h > 0 ? "Ellipse1.png" : "Ellipse2.png"}
          />
        </Box>
        <Box position="absolute" top="12px" left="101px">
          <Text
            fontFamily={theme.font}
            fontWeight={700}
            fontSize="14px"
            lineHeight="16.94px"
            color={theme.color}
          >
            {symbol}
          </Text>
        </Box>
        <Box position="absolute" top="31px" left="101px">
          <Text
            fontFamily={theme.font}
            fontWeight="400"
            fontSize="11px"
            color="#707070"
            lineHeight="normal"
          >
            {renderMarketCap(market_cap)}
          </Text>
        </Box>
        <Box position="absolute" w="80px" h="15px" top="21px" left="200px">
          <Text
            color={theme.color}
            fontWeight="700"
            fontSize="12px"
            lineHeight="14.52px"
            align="right"
          >
            ${renderPrice(price)}
          </Text>
        </Box>
        <Box
          position="absolute"
          maxW="46px"
          maxH="18px"
          top="19px"
          left="296px"
          borderRadius="4px"
          padding="3px"
          gap="10px"
          bg="rgba(36, 255, 0, 0.1)"
        >
          <Box width="40px" height="12px">
            {percent_change_1h > 0 ? (
              <TriangleUpIcon
                position="absolute"
                w="8px"
                h="6px"
                top="6px"
                left="3px"
                color="#24FF00"
              />
            ) : (
              <TriangleDownIcon
                position="absolute"
                w="8px"
                h="6px"
                top="6px"
                left="3px"
                color="#FF0000"
              />
            )}
            <Box position="absolute" w="30px" h="12px" top="3px" left="13px">
              <Text
                fontFamily={theme.font}
                fontWeight="700"
                fontSize="10px"
                color={percent_change_1h > 0 ? "#24FF00" : "#FF0000"}
                lineHeight="12.1px"
                align="right"
              >
                {refactorPercentChange(percent_change_1h)}%
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Token;
