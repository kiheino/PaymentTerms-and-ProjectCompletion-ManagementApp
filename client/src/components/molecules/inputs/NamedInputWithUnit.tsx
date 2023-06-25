import { FC, memo } from "react";
import { Box, Input, Text, HStack } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

type Props = {
  text: string;
  textWidth: object;
  placeholder: string;
  unitName: string;
  name: string;
  value: string;
  width: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NamedInputWithUnit: FC<Props> = memo((props) => {
  const {
    text,
    textWidth,
    placeholder,
    unitName,
    name,
    value,
    width,
    onChange,
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
          width={textWidth}
          h="24px"
          textAlign="right"
        >
          {text}
        </Text>
        <NumericFormat
          customInput={Input}
          placeholder={placeholder}
          height="27px"
          w={width}
          name={name}
          value={value}
          onChange={onChange}
          thousandSeparator=","
        />

        <Text
          fontFamily="Inter"
          lineHeight="1.5"
          fontWeight="regular"
          fontSize="16px"
          color="black"
        >
          {unitName}
        </Text>
      </HStack>
    </Box>
  );
});
