import { useNavigate } from "react-router-dom";
import { useLogin } from "@refinedev/core";

import { Layout, Button, Space } from "antd";
import { ThemedTitle } from "@refinedev/antd";

type LoginVariables = {
  username: string;
  password: string;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login } = useLogin<LoginVariables>();

  function handleLogin() {
    login({
      username: "admin",
      password: "admin",
    });
    navigate("/");
  }

  return (
    <Layout
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" align="center" size="large">
        <ThemedTitle
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
          }}
        />
        <Button
          type="primary"
          size="middle"
          onClick={handleLogin}
          style={{ width: "240px" }}
        >
          Sign in
        </Button>
      </Space>
    </Layout>
  );
};
