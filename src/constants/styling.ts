import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const tabletGuidelineBaseWidth = 768;
const tabletGuidelineBaseHeight = 1024;

export const scale = (size: number) => {
  const isTablet = shortDimension >= 600;
  const baseWidth = isTablet ? tabletGuidelineBaseWidth : guidelineBaseWidth;
  return Math.round(
    PixelRatio.roundToNearestPixel((shortDimension / baseWidth) * size)
  );
};

export const verticalScale = (size: number) => {
  const isTablet = longDimension >= 900;
  const baseHeight = isTablet ? tabletGuidelineBaseHeight : guidelineBaseHeight;
  return Math.round(
    PixelRatio.roundToNearestPixel((longDimension / baseHeight) * size)
  );
};

export const fontSize = (size: number) => {
  const isTablet = shortDimension >= 600;
  const baseWidth = isTablet ? tabletGuidelineBaseWidth : guidelineBaseWidth;
  const scaleRatio = shortDimension / baseWidth;
  
  // Less aggressive scaling for tablets
  const factor = isTablet ? 0.3 : 0.5;
  
  return Math.round(
    PixelRatio.roundToNearestPixel(size * Math.pow(scaleRatio, factor))
  );
};