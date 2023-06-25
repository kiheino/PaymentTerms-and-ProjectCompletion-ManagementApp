import { Button, Input, Stack, Link, Text, Spacer } from "@chakra-ui/react";
import { memo, FC, useState } from "react";
import { Link as Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authApi from "../../api/authApi";
import { AuthLayout } from "../layout/AuthLayout";

interface InputContent {
  userId: string;
  password: string;
}

export const Login: FC = memo(() => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputContent>();

  const [isLoading, setIsLoading] = useState(false);

  //APIを叩く
  const onSubmit = handleSubmit(async (user) => {
    console.log(user);
    setIsLoading(true);
    try {
      const res = await authApi.login(user);
      setIsLoading(false);
      localStorage.setItem("token", res.data.token);
      console.log("ログインに成功しました");
      navigate("/home");
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err: any) => {
        setError(err.path, { type: "custom", message: err.msg });
      });
      setIsLoading(false);
    }
  });

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <Stack spacing={3} py={4} px={12}>
          <Stack>
            <Input
              placeholder="ユーザーID"
              {...register("userId", {
                required: "ユーザー名を入力してください",
              })}
              borderColor={errors.userId ? "red.400" : "rgb(32, 152, 238)"}
              disabled={isLoading}
            />
            <Text color="red.400" fontSize="xs" mt="0" textAlign="center">
              {errors.userId && errors.userId.message}
            </Text>

            <Input
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードを入力してください",
              })}
              type={"password"}
              borderColor={errors.password ? "red.400" : "rgb(32, 152, 238)"}
              disabled={isLoading}
            />
            <Text color="red.400" fontSize="xs" mt="0" textAlign="center">
              {errors.password && errors.password.message}
            </Text>

            <Button
              isLoading={isLoading}
              type="submit"
              bg="rgba(32,152,238,1)"
              color="white"
              _hover={{ opacity: 0.8 }}
            >
              ログイン
            </Button>
          </Stack>
          <Spacer />
          <Link
            as={Route}
            to="/register"
            color="rgb(32, 152, 238)"
            w="300px"
            fontSize="sm"
            textAlign="center"
            _hover={{
              opacity: 0.7,
              textDecoration: "none",
            }}
          >
            初めての方は新規登録へ
          </Link>
        </Stack>
      </form>
    </AuthLayout>
  );
});
