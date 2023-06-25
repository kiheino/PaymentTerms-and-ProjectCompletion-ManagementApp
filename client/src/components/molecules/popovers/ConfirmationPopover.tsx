import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Text,
} from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

type Props = {
  client: {
    clientName: string;
    ruby: string;
    postalCode: string;
    address1: string;
    address2: string;
    phone: string;
    cutoffDate: string;
    paymentMonth: string;
    paymentDay: string;
  };
  registerClient: () => void;
};

export const ConfirmationPopover: FC<Props> = memo((props) => {
  const {
    clientName,
    ruby,
    postalCode,
    address1,
    address2,
    phone,
    paymentMonth,
    paymentDay,
  } = props.client;

  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function onSave() {
    props.registerClient();
  }

  useEffect(() => {
    setIsOpen(false);
  }, [props.client]);

  return (
    <Popover placement="top" closeOnBlur={true} isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          w="100px"
          size="sm"
          m="6px"
          bg="rgba(32,152,238,1)"
          color="white"
          _hover={{ opacity: 0.8 }}
          borderRadius="xl"
          justifySelf="center"
          onClick={open}
        >
          保存
        </Button>
      </PopoverTrigger>
      <PopoverContent
        color="gray.700"
        bg="white"
        borderColor="rgba(32,152,238,1)"
        borderWidth="2px"
        pt="30px"
        pl="40px"
        m="5px"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          入力内容を確認してください
        </PopoverHeader>
        <PopoverCloseButton onClick={close} />
        <PopoverBody>
          <Text> 契約先： {clientName}</Text>
          <Text> フリガナ: {ruby}</Text>
          <Text> 郵便番号: {postalCode}</Text>
          <Text> 住所: {address1}</Text>
          <Text> {address2}</Text>
          <Text> 電話番号: {phone}</Text>
          <Text> 請求締日: {paymentDay === "99" ? "末" : paymentDay}日</Text>
          <Text>
            支払日: {paymentMonth === "nextMonth" ? "翌月" : "翌々月"}
            {paymentDay === "99" ? "末" : paymentDay}日
          </Text>
        </PopoverBody>
        <PopoverFooter border="0" display="flex" alignItems="center" pb="30px">
          <Button
            m="6px"
            bg="rgba(32,152,238,1)"
            color="white"
            _hover={{ opacity: 0.8 }}
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
});
