"use client";

import Layout from "@/components/widgets/Layout.widget";
import { AuthProvider } from "@/context/auth.context";
import { CachedProvider } from "@/context/cached.context";
import { UtilsProvider } from "@/context/utils.context";
import { ReactNode } from "react";
import NetworkStatusBackdrop from "../services/network/networkCheck.service";
import { UIProvider } from "@/context/ui.context";
import AppLogout from "@/services/logoutinactive/logoutInactive.service";
import ThemeProvider from "@/store/themeProvider/themeProvider.provider";

type Props = {
  children: ReactNode;
};

export default function Layouts({ children }: Props) {
  return (
    <UtilsProvider>
      <UIProvider>
        <CachedProvider>
          <AuthProvider>
            <ThemeProvider>
              <NetworkStatusBackdrop>
                <AppLogout>
                  <Layout>{children}</Layout>
                </AppLogout>
              </NetworkStatusBackdrop>
            </ThemeProvider>
          </AuthProvider>
        </CachedProvider>
      </UIProvider>
    </UtilsProvider>
  );
}
