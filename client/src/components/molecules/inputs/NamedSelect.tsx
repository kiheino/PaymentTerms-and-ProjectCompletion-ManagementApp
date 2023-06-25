import { FC, ReactNode, memo } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

type Props = {
  text: string;
  textWidth: string | object;
  children: ReactNode;
};

export const NamedSelect: FC<Props> = memo((props) => {
  const { text, textWidth, children } = props;

  return (
    <Box>
      <HStack>
        <Text
          fontFamily="Inter"
          lineHeight="1.5"
          fontWeight="regular"
          fontSize={{ base: "14px", md: "16px" }}
          color="black"
          w={textWidth}
          h="24px"
          textAlign="right"
        >
          {text}
        </Text>

        {children}
      </HStack>
    </Box>
  );
});
