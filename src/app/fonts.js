import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { SpecialElite_400Regular } from '@expo-google-fonts/special-elite';
import { Ultra_400Regular } from '@expo-google-fonts/ultra';

import { FONT_FAMILIES } from '../config/theme';

// Archivos de fuente por familia, para useFonts().
export const FONT_SOURCES = {
  [FONT_FAMILIES.display]: Ultra_400Regular,
  [FONT_FAMILIES.game]: LuckiestGuy_400Regular,
  [FONT_FAMILIES.body]: Nunito_400Regular,
  [FONT_FAMILIES.bodyBold]: Nunito_700Bold,
  [FONT_FAMILIES.detail]: SpecialElite_400Regular,
};
