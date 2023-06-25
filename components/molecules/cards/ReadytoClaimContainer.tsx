import {
  Box,
  Container,
  Divider,
  Flex,
  Spacer,
  Center,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { memo, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type Props = {
  id: string;
};

export const ReadytoClaimContainer: FC<Props> = memo((props) => {
  const { id } = props;

  const unClaimedBills = useSelector(
    (state: RootState) => state.homeManagement.unClaimedBills
  );

  const data = unClaimedBills.find(({ _id }) => _id === id);
  const projects = data!.projects;

  function getFormattedDate(date: string) {
    const localTime = new Date(date);
    const [year, month, day] = [
      localTime.getFullYear(),
      localTime.getMonth() + 1,
      localTime.getDate(),
    ];
    return year + "/" + month + "/" + day;
  }
  const invoiceDate = getFormattedDate(data!.invoiceDate);
  const dueDate = getFormattedDate(data!.dueDate);

  function isFirst(obj: object) {
    return !(Object.keys(obj).length > 1);
  }

  const getTotalAmount = () => {
    const amountList = projects?.map((project) => {
      const currentBilling = project.billingAmount.filter(
        (item) => new Date(item.date) <= new Date(invoiceDate)
      );
      return currentBilling[currentBilling.length - 1].amount;
    });
    const totalAmount = amountList.reduce((sum, num) => sum + num, 0);
    return totalAmount;
  };
  const totalAmount = getTotalAmount();

  return (
    <Center>
      <Container
        m="3"
        p="5"
        maxW={{ base: "90%", lg: "892px" }}
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        shadow="md"
      >
        <VStack alignItems="left">
          <Flex>
            <HStack w="100%">
              <Box fontWeight="bold" letterSpacing="wide" fontSize="lg">
                {data!.client.clientName}
              </Box>
              <Spacer />
              <Box pr={3} fontSize={{ base: "sm", md: "md" }}>
                請求日： {invoiceDate}
              </Box>
              <Box fontSize={{ base: "sm", md: "md" }}>
                支払予定日： {dueDate}
              </Box>
            </HStack>
          </Flex>
          <Divider borderWidth="1.5px" />
          {projects!.map((project) => {
            const currentBilling = project.billingAmount.filter(
              (item) => new Date(item.date) <= new Date(invoiceDate)
            );
            return (
              <Box key={project._id}>
                <Flex>
                  <HStack w="100%" spacing="5">
                    <Box fontWeight="semibold" fontSize="md">
                      {project.projectName}
                    </Box>
                    <Spacer />

                    <Box h="100%" display="flex" alignItems="flex-end">
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        {project.isCompleted &&
                        new Date(project.completionDate) < new Date(invoiceDate)
                          ? `完了日: ${getFormattedDate(
                              project.completionDate
                            )}`
                          : "出来高"}
                      </Text>
                    </Box>
                    {isFirst(currentBilling) ? (
                      <Box textAlign="right">
                        <Box
                          textColor="gray.400"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          契約金額: {project.contractAmount.toLocaleString()}
                          円＋税
                        </Box>

                        <Box fontSize={{ base: "sm", md: "md" }}>
                          今回請求額:
                          {currentBilling[0].amount.toLocaleString()}円＋税
                        </Box>
                      </Box>
                    ) : (
                      <Box textAlign="right">
                        <Box
                          textColor="gray.400"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          契約金額: {project.contractAmount.toLocaleString()}
                          円＋税
                        </Box>
                        <Box
                          textColor="gray.400"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          既請求額：
                          {(
                            currentBilling.reduce(
                              (previousValue, currentValue) => {
                                return previousValue + currentValue.amount;
                              },
                              0
                            ) -
                            currentBilling[project.billingAmount.length - 1]
                              .amount
                          ).toLocaleString()}
                          円＋税
                        </Box>
                        <Box fontSize={{ base: "sm", md: "md" }}>
                          今回請求額:
                          {currentBilling[
                            currentBilling.length - 1
                          ].amount.toLocaleString()}
                          円＋税
                        </Box>
                      </Box>
                    )}
                  </HStack>
                </Flex>
                <Divider />
              </Box>
            );
          })}
          <Flex>
            <Box fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
              請求合計金額: {(totalAmount * 1.1).toLocaleString()}円（税込）
            </Box>
            <Spacer />

            <Box px={2} fontSize={{ base: "sm", md: "md" }}>
              消費税: {(totalAmount * 0.1).toLocaleString()}円
            </Box>

            <Box fontSize={{ base: "sm", md: "md" }}>
              小計: {totalAmount.toLocaleString()}円＋税
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Center>
  );
});
