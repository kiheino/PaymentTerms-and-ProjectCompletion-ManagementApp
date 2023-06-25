import { Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";

type Props = {
  children: ReactJSXElement;
};

export const AuthLayout: FC<Props> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    //ページ遷移する度にJWTを持っているか確認する
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/home");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bgColor="whiteAlpSha.100"
    >
      <Stack spacing={5} py={4} px={12}>
        <Heading as="h1" size="lg" textAlign="center" fontWeight="semibold">
          請求締日管理アプリ
        </Heading>
        <Divider
          variant="dashed"
          w="230px"
          alignSelf="center"
          borderWidth="2px"
          borderColor="cyan.200"
        />
        {props.children}
      </Stack>
    </Flex>
  );
};
