import React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// refine
import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  notificationProvider,
  ThemedLayout,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router-v6";
// import dataProvider from '@refinedev/simple-rest';

// libs
import { authProvider, nestJsDataProvider } from "libs/RestProvider";

// ant
import { AppstoreOutlined } from "@ant-design/icons";

// context
import { ColorModeContextProvider } from "./contexts/color-mode";

// components
import { Header, Title } from "components";

const Dashboard = React.lazy(() => import("pages/dashboard"));
const Login = React.lazy(() => import("pages/Login"));

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            authProvider={authProvider}
            dataProvider={nestJsDataProvider}
            // dataProvider={dataProvider('https://api.fake-rest.refine.dev')} // using fake rest api
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "instance_setup",
                icon: <AppstoreOutlined />,
                list: "/",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout Header={Header} Title={Title}>
                      <div className="m-[-24px]">
                        <Outlet />
                      </div>
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="/">
                  <Route index element={<Dashboard />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />

              <Route
                element={
                  <ThemedLayout Header={Header} Title={Title}>
                    <div className="m-[-24px]">
                      <Outlet />
                    </div>
                  </ThemedLayout>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
