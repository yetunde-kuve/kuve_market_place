import Head from "next/head";
import sliderStyles from "../styles/Slider.module.css";

const Header = ({
  title,
  description,
  image,
  url,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
} = {}) => {
  const theDescription =
    description ??
    `Splitam is your ultimate destination for smart cost-sharing. Are you tired of shouldering the burden of high expenses all on your own? Well, fret no more! With Splitam, you can easily team up with like-minded individuals to divide the costs and unlock incredible savings on a wide range of products, accommodation options, transportation, and so much more`;
  const theTitle =
    title ??
    `Team Up With Others to Split Costs on Products, Accommodation, Transportation & More!`;
  const theImage = image ?? `https://splitam.co/img/icon1.png`;
  const theUrl = url ?? `https://splitam.co`;
  return (
    <Head>
      <title>{theTitle}</title>
      <meta name="description" content={theDescription} />
      <meta property="og:title" content={theTitle} />
      <meta property="og:description" content={theDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={theUrl} />
      <meta property="og:image" content={theImage} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
    </Head>
  );
};

export default Header;
