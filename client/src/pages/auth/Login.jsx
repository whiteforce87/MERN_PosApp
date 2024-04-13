import React from "react";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Button, Carousel, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import AuthComponent from "./AuthComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const login = async () => {
      setLoading(true);
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });

        const user = await res.json();
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify({
            username: user.username,
            email: user.email
          }))
          message.success("Giriş işlemi başarılı");
          navigate("/");
        } else if (res.status === 404) {
          message.error("Kullanıcı bulunamadı!");
        } else if (res.status === 403) {
          message.error("Şifre yanlış!");
        }
        setLoading(false);
      } catch (error) {
        message.error("Birşeyler yanlış gitti");
        console.log(error);
        setLoading(false);
      }
    };
    login();
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Fatih's PosApp</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email Adı Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre  Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between item-center">
                <Checkbox>Remeber me</Checkbox>
                <Link>Forget Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bit hesabınız yok mu? &nbsp;{" "}
            <Link to="/register" className="text-blue-600">
              Kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden  bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthComponent
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Tüm Cihazlarla uyumluluk"
                ></AuthComponent>
                <AuthComponent
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş İstatistik"
                ></AuthComponent>
                <AuthComponent
                  img="/images/customer.svg"
                  title="Müşteri"
                  desc="Müşteri Memnuniyeti"
                ></AuthComponent>
                <AuthComponent
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerel Yönetim"
                ></AuthComponent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
