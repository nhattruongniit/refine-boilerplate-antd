import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// refine
import { Refine } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { ErrorComponent, notificationProvider, ThemedLayout } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import routerBindings from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';

// ant
import { AppstoreOutlined } from '@ant-design/icons';

// context
import { ColorModeContextProvider } from './contexts/color-mode';

// components
import { Header, Title } from 'components';

const Dashboard = React.lazy(() => import('pages/dashboard'));

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
            dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: 'instance_setup',
                icon: <AppstoreOutlined />,
                list: '/',
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
                  <ThemedLayout Header={Header} Title={Title}>
                    <div className="m-[-24px]">
                      <Outlet />
                    </div>
                  </ThemedLayout>
                }
              >
                <Route path="/">
                  <Route index element={<Dashboard />} />
                </Route>
              </Route>
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
