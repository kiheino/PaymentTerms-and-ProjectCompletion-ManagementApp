import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";

type Props = {
  children: ReactJSXElement;
};

export const AppLayout: FC<Props> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    //ページ遷移してきた度にJWTを持っているか確認する
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return <>{props.children}</>;
};
