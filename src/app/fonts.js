import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';

import { FONT_FAMILIES } from '../config/theme';

// Archivos de fuente por familia, para useFonts().
export const FONT_SOURCES = {
  [FONT_FAMILIES.display]: SpaceGrotesk_700Bold,
  [FONT_FAMILIES.heading]: SpaceGrotesk_600SemiBold,
  [FONT_FAMILIES.body]: Inter_400Regular,
  [FONT_FAMILIES.bodyMedium]: Inter_500Medium,
  [FONT_FAMILIES.bodyBold]: Inter_700Bold,
};
