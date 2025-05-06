import { HexToCssConfiguration, hexToCSSFilter } from "hex-to-css-filter";

export const text_colors = [
  "black",
  "orange3",
  "pink3",
  "red0",
  "blue0",
  " m_blue0",
  "app_color",
  "light_green3",
  "app_color",
];
export const rand_colors = [
  "orange03",
  "pink03",
  "red04",
  "blue04",
  " orange02",
  "m_blue04",
  "brown04",
  "light_green04",
  "brown02",
];
export const rand_colors1 = [
  "orange05",
  "pink05",
  "red06",
  "blue06",
  "orange04",
  "m_blue06",
  "brown06",
  "light_green06",
  "brown04",
];
export const rand_colors2 = [
  "orange01",
  "pink01",
  "red02",
  "blue02",
  "orange0",
  "m_blue02",
  "brown02",
  "light_green02",
  "app_color",
];
export const rand_colors3 = [
  "orange08",
  "pink08",
  "red08",
  "blue07",
  "orange09",
  "m_blue08",
  "brown09",
  "light_green09",
  "brown08",
];

export const back_colors = [
  "white",
  "orange08",
  "pink08",
  "red08",
  "blue07",
  "orange09",
  "m_blue08",
  "brown09",
  "light_green09",
  "brown08",
];

export function getRandomColor(type: number) {
  type = type ?? 0;
  return rand_colors[type % rand_colors.length];
}

export function getRandomColor2(type: number) {
  type = type ?? 0;
  return rand_colors2[type % rand_colors2.length];
}

export function getRandomTextColor(type: number) {
  type = type ?? 0;
  return text_colors[type % text_colors.length];
}

export function getRandomColor3(type: number, reverse?: false) {
  type = type ?? 0;
  let colors = Array.from(rand_colors3);
  if (reverse) colors.reverse;
  return colors[type % colors.length];
}
export function getRandomColorb(type: number, reverse?: false) {
  const rand_colors = [
    orange03,
    pink03,
    red04,
    blue04,
    orange02,
    m_blue04,
    brown04,
    light_green04,
    brown02,
  ];
  type = type ?? 0;
  let colors = Array.from(rand_colors);
  if (reverse) colors.reverse;
  return colors[type % colors.length];
}

const config: HexToCssConfiguration = {
  acceptanceLossPercentage: 1,
  maxChecks: 10,
};

export function filterColor(color: any) {
  return hexToCSSFilter(color, config).filter.replaceAll(";", "");
}

export const brown0 = "#a52a2a";
export const brown1 = "#942525";
export const brown1b = "#f3842121";
export const brown2 = "#842121";
export const brown3 = "#731d1d";
export const brown4 = "#631919";
export const brown5 = "#521515";
export const brown6 = "#421010";
export const brown7 = "#310c0c";
export const brown8 = "#210808";
export const brown9 = "#100404";

export const brown01 = "#ae3f3f";
export const brown02 = "#b75454";
export const brown03 = "#c06969";
export const brown04 = "#c97f7f";
export const brown05 = "#d29494";
export const brown06 = "#dba9a9";
export const brown07 = "#e4bfbf";
export const brown08 = "#edd4d4";
export const brown09 = "#1ef6e9e9";

export const blue0 = "#8470ff";
export const blue1 = "#7664e5";
export const blue2 = "#6959cc";
export const blue3 = "#5c4eb2";
export const blue4 = "#4f4399";
export const blue5 = "#42387f";
export const blue6 = "#342c66";
export const blue7 = "#27214c";
export const blue8 = "#1a1633";
export const blue9 = "#0d0b19";

export const blue01 = "#8470ff";
export const blue02 = "#907eff";
export const blue03 = "#928cff";
export const blue04 = "#a89aff";
export const blue05 = "#b5a9ff";
export const blue06 = "#c1b7ff";
export const blue07 = "#cdc5ff";
// export const blue08 = "#08534949"
export const blue09 = "#0f534949";

export const black = "#000000";
export const white = "#ffffff";
export const white1 = "#fafafa";
export const transparent = "#0000";
export const default_white = "#fff3f3f3";

export const tang0 = "#ffa500";

export const orange0 = "#ffa500";
export const orange1 = "#e59400";
export const orange2 = "#cc8400";
export const orange3 = "#b27300";
export const orange4 = "#996300";
export const orange5 = "#7f5200";
export const orange6 = "#664200";
export const orange7 = "#4c3100";
export const orange8 = "#332100";
export const orange9 = "#191000";

export const orange01 = "#ffa500";
export const orange02 = "#ffae19";
export const orange03 = "#ffb732";
export const orange04 = "#ffc04c";
export const orange05 = "#ffc966";
export const orange06 = "#ffd27f";
export const orange07 = "#ffdb99";
export const orange08 = "#ffe4b2";
export const orange09 = "#ffedcc";
export const orange010 = "#fff6e5";

export const yellow0 = "#ffff00";
export const yellow1 = "#e5e500";
export const yellow2 = "#cccc00";
export const yellow3 = "#b2b200";
export const yellow4 = "#999900";
export const yellow5 = "#7f7f00";
export const yellow6 = "#666600";
export const yellow7 = "#4c4c00";
export const yellow8 = "#333300";
export const yellow9 = "#191900";

export const yellow01 = "#ffff00";
export const yellow02 = "#ffff19";
export const yellow03 = "#ffff32";
export const yellow04 = "#ffff4c";
export const yellow05 = "#ffff66";
export const yellow06 = "#ffff7f";
export const yellow07 = "#ffff99";
export const yellow08 = "#ffffb2";
export const yellow09 = "#ffffcc";
export const yellow010 = "#ffffe5";

export const red0 = "#ff0000";
export const red1 = "#e50000";
export const red2 = "#cc0000";
export const red3 = "#b20000";
export const red4 = "#990000";
export const red5 = "#7f0000";
export const red6 = "#660000";
export const red7 = "#4c0000";
export const red8 = "#330000";
export const red9 = "#190000";

export const red00 = "#ff0000";
export const red01 = "#ff1919";
export const red02 = "#ff3232";
export const red03 = "#ff4c4c";
export const red04 = "#ff6666";
export const red05 = "#ff7f7f";
export const red06 = "#ff9999";
export const red07 = "#ffb2b2";
export const red08 = "#ffcccc";
export const red09 = "#ffe5e5";

export const dark_green0 = "#006400";
export const dark_green1 = "#005a00";
export const dark_green2 = "#005000";
export const dark_green3 = "#004600";
export const dark_green4 = "#003c00";
export const dark_green5 = "#003200";
export const dark_green6 = "#002800";
export const dark_green7 = "#001e00";
export const dark_green8 = "#001400";
export const dark_green9 = "#000a00";
export const dark_green10 = "#000000";

export const dark_green01 = "#006400";
export const dark_green02 = "#197319";
export const dark_green03 = "#328332";
export const dark_green04 = "#4c924c";
export const dark_green05 = "#66a266";
export const dark_green06 = "#7fb17f";
export const dark_green07 = "#99c199";
export const dark_green08 = "#b2d0b2";
export const dark_green09 = "#cce0cc";
export const dark_green010 = "#e5efe5";

export const light_green0 = "#00ff00";
export const light_green1 = "#00e500";
export const light_green2 = "#00cc00";
export const light_green3 = "#00b200";
export const light_green4 = "#009900";
export const light_green5 = "#007f00";
export const light_green6 = "#006600";
export const light_green7 = "#004c00";
export const light_green8 = "#003300";
export const light_green9 = "#001900";
export const light_green10 = "#000000";

export const light_green00 = "#00ff00";
export const light_green01 = "#19ff19";
export const light_green02 = "#32ff32";
export const light_green03 = "#4cff4c";
export const light_green04 = "#66ff66";
export const light_green05 = "#7fff7f";
export const light_green06 = "#99ff99";
export const light_green07 = "#b2ffb2";
export const light_green08 = "#ccffcc";
export const light_green09 = "#e5ffef";
export const light_green010 = "#ffffff";

export const pink0 = "#ff69b4";
export const pink1 = "#e55ea2";
export const pink2 = "#cc5490";
export const pink3 = "#b2497d";
export const pink4 = "#993f6c";
export const pink5 = "#7f345a";
export const pink6 = "#662a48";
export const pink7 = "#4c1f36";
export const pink8 = "#331524";
export const pink9 = "#190a12";
export const pink10 = "#000000";

export const pink01 = "#ff78bb";
export const pink02 = "#ff87c3";
export const pink03 = "#ff96ca";
export const pink04 = "#ffa5d2";
export const pink05 = "#ffb4d9";
export const pink06 = "#ffc3e1";
export const pink07 = "#ffd2e8";
export const pink08 = "#ffe1f0";
export const pink09 = "#fff0f7";
export const pink010 = "#ffffff";

export const app_color = "#a52a2a";

export const app_blue = "#0072e5";

export const blue010 = "#0f534949";

export const m_blue0 = "#0000ff";
export const m_blue1 = "#0000e5";
export const m_blue2 = "#0000cc";
export const m_blue3 = "#0000b2";
export const m_blue4 = "#000099";
export const m_blue5 = "#00007f";
export const m_blue6 = "#000066";
export const m_blue7 = "#00004c";
export const m_blue8 = "#000033";
export const m_blue9 = "#000019";

export const plain_blue = "#000064";
export const m_blue01 = "#1919ff";
export const m_blue02 = "#4c4cff";
export const m_blue03 = "#6666ff";
export const m_blue04 = "#7f7fff";
export const m_blue05 = "#9999ff";
export const m_blue06 = "#b2b2ff";
export const m_blue07 = "#ccccff";
export const m_blue08 = "#e5e5ff";

export const azure_blue00 = "#007fff";
export const azure_blue01 = "#198bff";
export const azure_blue02 = "#3298ff";
export const azure_blue03 = "#4ca5ff";
export const azure_blue04 = "#66b2ff";
export const azure_blue05 = "#7fbfff";
export const azure_blue06 = "#99cbff";
export const azure_blue07 = "#b2d8ff";
export const azure_blue08 = "#cce5ff";
export const azure_blue09 = "#e5f2ff";

export const azure_blue0 = "#007fff";
export const azure_blue1 = "#0072e5";
export const azure_blue2 = "#0065cc";
export const azure_blue3 = "#0058b2";
export const azure_blue4 = "#004c99";
export const azure_blue5 = "#003f7f";
export const azure_blue6 = "#003266";
export const azure_blue7 = "#00264c";
export const azure_blue8 = "#001933";
export const azure_blue9 = "#000c19";

export const light_grey = "#14000000";
export const light_white = "#c7ffffff";
export const dark_grey = "#96000000";

export const brown00 = "#a52a2a";

export const brown010 = "#ffffff";

export const black1 = "#cd000000";

export const brown10 = "#000000";

export const white60 = "#a0ffffff";
export const white_two = "#efefef";
export const white_three = "#ebebeb";
export const white_four = "#e0e0e0";
export const white_five = "#dadada";
export const blue = "#031cd7";
export const gray = "#333333";
export const dark_gray = "#282a2b";
export const dark_grey_two = "#191a1b";
export const warm_grey = "#7f7f7f";
export const warm_grey_two = "#9c9c9c";
export const warm_grey_three = "#8b8b8b";
export const warm_grey_four = "#979797";
export const dark_mint = "#51c05c";
export const cornflower_blue_two = "#4f62d7";
export const cornflower_blue_two_24 = "#3d4f62d7";
export const cornflower_blue_two_dark = "#475bd4";
export const cornflower_blue_light_40 = "#64bec5f7";

export const cornflower_blue = "#6274e2";
export const cornflower_blue_dark = "#303F9F";
export const cornflower_blue_darkest = "#2d3a93";
export const gray_light = "#e8e8e8";
export const gray_transparent = "#a6efefef";
export const gray_dark = "#858585";
export const gray_dark_transparent = "#ae858585";
export const gray_darkest = "#ae282828";
export const black_10 = "#19000000";
export const ivory = "#f8efe6";
export const ivory_dark = "#f7e8d9";
export const green = "#38be55";
export const green_dark = "#2da346";
export const red = "#e94f4f";
export const brown = "#4e342e";
export const bronze = "#cd7f32";
export const silver = "#aaa9ad";
export const gold = "#d4af37";
