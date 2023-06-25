import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  Box,
  Input,
  VStack,
  Text,
  HStack,
  RadioGroup,
  Radio,
  Stack,
  Container,
} from "@chakra-ui/react";

type Props = {
  handlePaymentTerms: (paymentTerms: {
    cutoffDate: string;
    paymentMonth: string;
    paymentDay: string;
  }) => void;
  textWidth: string;
};

type paymentTerms = {
  cutoffDate: string;
  paymentMonth: string;
  paymentDay: string;
};

export const PaymentTermsInput: FC<Props> = memo((props) => {
  const { handlePaymentTerms } = props;
  const [paymentTerms, setPaymentTerms] = useState<paymentTerms>({
    cutoffDate: "",
    paymentMonth: "nextMonth",
    paymentDay: "",
  });

  const { detectSubmitCompletion } = useSelector(
    (state: RootState) => state.submit
  );
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPaymentTerms((prevItems) => {
      return { ...prevItems, [name]: value };
    });
  }

  function handleRadioChange(value: string) {
    setPaymentTerms((prevItems) => {
      return { ...prevItems, paymentMonth: value };
    });
  }
  useEffect(() => {
    handlePaymentTerms(paymentTerms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentTerms]);

  useEffect(() => {
    setPaymentTerms({
      cutoffDate: "",
      paymentMonth: "nextMonth",
      paymentDay: "",
    });
  }, [detectSubmitCompletion]);

  return (
    <Box>
      <VStack alignItems="left" mt="6px">
        <HStack>
          <Text
            fontFamily="Inter"
            lineHeight="1.5"
            fontWeight="regular"
            fontSize={{ base: "14px", md: "16px" }}
            color="black"
            w={props.textWidth}
            h="24px"
            textAlign="right"
          >
            支払条件:
          </Text>
          <Container
            p="15px"
            width="370px"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          >
            <VStack alignItems="left">
              <HStack>
                <Text
                  fontFamily="Inter"
                  lineHeight="1.5"
                  fontWeight="regular"
                  fontSize="16px"
                  color="black"
                  ml="15px"
                >
                  締日:
                </Text>
                <Input
                  name="cutoffDate"
                  value={paymentTerms.cutoffDate}
                  onChange={handleChange}
                  placeholder="99"
                  width="55px"
                  height="27px"
                />
                <Text
                  fontFamily="Inter"
                  lineHeight="1.5"
                  fontWeight="regular"
                  fontSize="16px"
                  color="black"
                >
                  日
                </Text>
              </HStack>
              <HStack>
                <Text
                  fontFamily="Inter"
                  lineHeight="1.5"
                  fontWeight="regular"
                  fontSize="16px"
                  color="black"
                  textAlign="right"
                >
                  支払日:
                </Text>

                <RadioGroup
                  name="paymentMonth"
                  onChange={handleRadioChange}
                  value={paymentTerms.paymentMonth}
                >
                  <Stack direction="row">
                    <Radio value="nextMonth" colorScheme="cyan">
                      翌月
                    </Radio>
                    <Radio value="twoMonthAfter" colorScheme="cyan">
                      翌々月
                    </Radio>
                  </Stack>
                </RadioGroup>

                <Input
                  name="paymentDay"
                  value={paymentTerms.paymentDay}
                  onChange={handleChange}
                  placeholder="99"
                  width="55px"
                  height="27px"
                />
                <Text
                  fontFamily="Inter"
                  lineHeight="1.5"
                  fontWeight="regular"
                  fontSize="16px"
                  color="black"
                >
                  日
                </Text>
              </HStack>
            </VStack>
          </Container>
        </HStack>
      </VStack>
    </Box>
  );
});
