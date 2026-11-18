import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../../config/theme';

function iniciales(nombre) {
  const partes = String(nombre ?? '')
    .replace(/^(prof|lic|dr|dra)\.?\s+/i, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (partes.length === 0) return '?';
  const primera = partes[0][0] ?? '';
  const ultima = partes.length > 1 ? (partes[partes.length - 1][0] ?? '') : '';
  return (primera + ultima).toUpperCase();
}

/** Avatar circular con las iniciales del nombre. */
export default function Avatar({ name, size = 52, style }) {
  return (
    <View
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{iniciales(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  text: {
    fontFamily: fonts.display,
    color: colors.primary,
  },
});
