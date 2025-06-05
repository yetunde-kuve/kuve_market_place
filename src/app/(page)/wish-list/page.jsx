import React from 'react';
import LandingPageWrapper from "../../../layouts/landingPageWrapper/landingPageWrapper.wrapper";
import WishlistPage from "./features/WishlistPage";

const Page = () => {
    return (
        <LandingPageWrapper>
            <WishlistPage />
        </LandingPageWrapper>
    );
};

export default Page;