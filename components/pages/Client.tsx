import { memo, FC, useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import Header from "../layout/Header";
import { NamedInput } from "../molecules/inputs/NamedInput";
import { PaymentTermsInput } from "../molecules/inputs/PaymentTermsInput";
import { AppLayout } from "../layout/AppLayout";
import { ConfirmationPopover } from "../molecules/popovers/ConfirmationPopover";
import clientApi from "../../api/clientAPI";
import { useDispatch } from "react-redux";
import { finished } from "../../redux/features/SubmitSlice";

type PaymentTerms = {
  cutoffDate: string;
  paymentMonth: string;
  paymentDay: string;
};

type Client = {
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

export const ClientManagement: FC = memo(() => {
  const dispatch = useDispatch();
  const [client, setClient] = useState<Client>({
    clientName: "",
    ruby: "",
    postalCode: "",
    address1: "",
    address2: "",
    phone: "",
    cutoffDate: "",
    paymentMonth: "",
    paymentDay: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setClient((prevItems) => {
      return { ...prevItems, [name]: value };
    });
  }

  function handlePaymentTerms(paymentTerms: PaymentTerms) {
    setClient((prevItems) => {
      return {
        ...prevItems,
        cutoffDate: paymentTerms.cutoffDate,
        paymentMonth: paymentTerms.paymentMonth,
        paymentDay: paymentTerms.paymentDay,
      };
    });
  }

  //APIを叩く
  const registerClient = async () => {
    try {
      clientApi.register(client).then((res) => {
        console.log(res);
        setClient({
          clientName: "",
          ruby: "",
          postalCode: "",
          address1: "",
          address2: "",
          phone: "",
          cutoffDate: "",
          paymentMonth: "",
          paymentDay: "",
        });
        dispatch(finished());
      });
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
    } finally {
    }
  };

  return (
    <AppLayout>
      <>
        <Header />

        <Center p="24px">
          <VStack>
            <VStack direction="row" spacing="8px" alignItems="left">
              <NamedInput
                text="契約先名:"
                textWidth="70px"
                name="clientName"
                placeholder="㈱React建設"
                width="370px"
                onChange={handleChange}
                value={client.clientName}
              />
              <NamedInput
                text="フリガナ:"
                textWidth="70px"
                name="ruby"
                placeholder="カ）リアクトケンセツ"
                width="370px"
                onChange={handleChange}
                value={client.ruby}
              />
              <NamedInput
                text="郵便番号:"
                textWidth="70px"
                name="postalCode"
                placeholder="000-0000"
                width="170px"
                onChange={handleChange}
                value={client.postalCode}
              />
              <NamedInput
                text="所在地:"
                textWidth="70px"
                name="address1"
                placeholder="所在地"
                width="370px"
                onChange={handleChange}
                value={client.address1}
              />
              <NamedInput
                text=""
                textWidth="70px"
                name="address2"
                placeholder="上記に収まらないとき"
                width="370px"
                onChange={handleChange}
                value={client.address2}
              />
              <NamedInput
                text="TEL:"
                textWidth="70px"
                name="phone"
                placeholder="06-1234-5678"
                width="170px"
                onChange={handleChange}
                value={client.phone}
              />

              <PaymentTermsInput
                handlePaymentTerms={handlePaymentTerms}
                textWidth="70px"
              />
            </VStack>

            <ConfirmationPopover
              client={client}
              registerClient={registerClient}
            />
          </VStack>
        </Center>
      </>
    </AppLayout>
  );
});
