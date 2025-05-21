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
import { ToastProvider } from "@/context/toast.context";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {
  children: ReactNode;
};
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
export default function Layouts({ children }: Props) {
  return (
    <UtilsProvider>
      <UIProvider>
        <CachedProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            <AuthProvider>
              <ToastProvider>
                <ThemeProvider>
                  <NetworkStatusBackdrop>
                    <AppLogout>
                      <Layout>{children}</Layout>
                    </AppLogout>
                  </NetworkStatusBackdrop>
                </ThemeProvider>
              </ToastProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
        </CachedProvider>
      </UIProvider>
    </UtilsProvider>
  );
}
