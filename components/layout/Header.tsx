import {
  HStack,
  Flex,
  Spacer,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from "@chakra-ui/react";
import { Link as Route, useNavigate } from "react-router-dom";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";

function Header() {
  const navigate = useNavigate();

  const headerStyle = {
    margin: "auto",
    padding: "16px 32px",
    background: "rgba(32,152,238,1)",
  };
  const h1Style = {
    color: "#fff",
    fontSize: "larger",
    fontWeight: "bold",
  };

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header style={headerStyle}>
      <Flex>
        <h1 style={h1Style}>請求締日管理アプリ</h1>
        <Spacer />
        <HStack
          spacing={{ base: "20px", md: "53px" }}
          mr={{ base: "10px", md: "83px" }}
        >
          <Box display={{ base: "none", md: "block" }}>
            <HStack spacing="53px">
              <Link
                as={Route}
                to="/home"
                color="white"
                fontWeight="semibold"
                _hover={{ textDecoration: "none" }}
              >
                請求管理
              </Link>
              <Link
                as={Route}
                to="/client"
                color="white"
                fontWeight="semibold"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                顧客登録
              </Link>
            </HStack>
          </Box>

          <Box display={{ base: "block", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                title="メニュー"
                aria-label="メニュー"
                icon={<HamburgerIcon />}
                color="white"
                variant="outline"
                _hover={{ opacity: 0.8 }}
                colorScheme="blue"
              />
              <MenuList>
                <MenuItem>
                  <Link
                    as={Route}
                    to="/home"
                    color="gray.800 "
                    _hover={{ textDecoration: "none", opacity: 0.8 }}
                  >
                    請求管理
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={Route}
                    to="/client"
                    color="gray.800 "
                    _hover={{ textDecoration: "none", opacity: 0.8 }}
                  >
                    顧客登録
                  </Link>
                </MenuItem>
                <MenuItem as="button" onClick={logout}>
                  ログアウト
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <IconButton
            aria-label="logout"
            title="ログアウト"
            onClick={logout}
            colorScheme="linkedIn"
            size="xl"
            icon={<ArrowForwardIcon />}
            display={{ base: "none", md: "block" }}
          />
        </HStack>
      </Flex>
    </header>
  );
}

export default Header;
