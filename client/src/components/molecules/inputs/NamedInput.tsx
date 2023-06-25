import { FC, memo } from "react";
import { Box, Input, Text, HStack } from "@chakra-ui/react";

type Props = {
  text: string;
  textWidth: string | object;
  name: any;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  width?: string;
  onClick?: () => void;
};

export const NamedInput: FC<Props> = memo((props) => {
  const {
    name,
    text,
    textWidth,
    placeholder,
    value,
    width,
    onChange,
    onClick,
  } = props;

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

        <Input
          name={name}
          placeholder={placeholder}
          height="27px"
          w={width}
          onChange={(e) => onChange(e)}
          onClick={onClick}
          value={value}
        />
      </HStack>
    </Box>
  );
});
