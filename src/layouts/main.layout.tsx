"use client";
import Layout from "@/components/widgets/Layout.widget";
import { AuthProvider } from "@/context/auth.context";
// import { AuthProvider } from "@/app/context/auth.context";
import { CachedProvider } from "@/context/cached.context";
import { UtilsProvider } from "@/context/utils.context";
import { ReactNode } from "react";
import NetworkStatusBackdrop from "../services/network/networkCheck.service";

import { UIProvider } from "@/context/ui.context";
import AppLogout from "@/services/logoutinactive/logoutInactive.service";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function Layouts({ children }: Props) {
  return (
    <UtilsProvider>
      <UIProvider>
        <CachedProvider>
          <AuthProvider>
            <NetworkStatusBackdrop>
              <AppLogout>
                <Layout>{children}</Layout>
              </AppLogout>
            </NetworkStatusBackdrop>
          </AuthProvider>
        </CachedProvider>
      </UIProvider>
    </UtilsProvider>
  );
}
