import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menuTheme";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "white",
        color: "gray.800",
      },
    },
  },
  components: {
    Menu: menuTheme,
  },
});

export default theme;
