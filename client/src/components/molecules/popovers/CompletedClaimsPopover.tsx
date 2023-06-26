import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  FormLabel,
  Input,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import invoiceApi from "../../../api/invoiceApi";
import { useDispatch, useSelector } from "react-redux";
import { refreshProjects } from "../../../redux/features/homeSlice";
import { RootState } from "../../../redux/store";

type Props = {
  projectId: string;
};

export const CompletedClaimsPopover: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.homeManagement.projectList
  );
  const project = projects.find(({ _id }) => _id === props.projectId);

  const { projectId } = props;

  const localTime = new Date(project!.scheduledCompletionDate);
  const [year, month, day] = [
    localTime.getFullYear(),
    localTime.getMonth() + 1,
    localTime.getDate(),
  ];
  const formattedDate = year + "/" + month + "/" + day;

  const formattedContractAmount = Number(
    project?.contractAmount
  ).toLocaleString();

  const [completionDate, setCompletionDate] = useState(formattedDate);
  const [isOpen, setIsOpen] = useState(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCompletionDate(event.target.value);
  }

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  async function onSave() {
    const data = {
      projectId: projectId,
      completionDate: completionDate,
    };
    try {
      const res = await invoiceApi.register(data);
      console.log(res);
      dispatch(refreshProjects());
      setIsOpen(false);
    } catch {
      alert("エラー");
    }
  }

  return (
    <Popover
      placement="bottom"
      closeOnBlur={true}
      isOpen={isOpen}
      onOpen={open}
    >
      <PopoverTrigger>
        <Button
          colorScheme="red"
          variant="outline"
          size={{ base: "xs", md: "sm" }}
          fontSize={{ base: "sm", md: "normal" }}
        >
          工事完了入力
        </Button>
      </PopoverTrigger>
      <PopoverContent
        color="gray.700"
        bg="white"
        borderColor="red.500"
        borderWidth="1.5px"
        pt="30px"
        pr="35px"
        pl="40px"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <Text>
            支払日:{" "}
            {project?.client.paymentMonth === "nextMonth" ? "翌月" : "翌々月"}
            {project?.client.paymentMonth === "99"
              ? "末"
              : project?.client.paymentDay}
            日
          </Text>
          <Text> 契約金額： {formattedContractAmount}円</Text>
        </PopoverHeader>
        <PopoverCloseButton onClick={close} />
        <PopoverBody>
          <FormLabel>工事完了日</FormLabel>
          <HStack>
            <Input
              focusBorderColor="grey"
              onChange={onChange}
              value={completionDate}
            />
          </HStack>
        </PopoverBody>
        <PopoverFooter border="0" display="flex" alignItems="center" pb="30px">
          <Button
            m="6px"
            colorScheme="red"
            variant="outline"
            borderRadius="xl"
            justifySelf="center"
            onClick={onSave}
          >
            この内容で保存する
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
