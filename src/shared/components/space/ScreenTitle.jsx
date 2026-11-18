import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../../config/theme';

/** Título de pantalla en Space Grotesk con subtítulo opcional en Inter. */
export default function ScreenTitle({ title, subtitle, align = 'left', style }) {
  const textAlign = align === 'center' ? 'center' : 'left';
  return (
    <View style={style}>
      <Text style={[styles.title, { textAlign }]} accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text style={[styles.subtitle, { textAlign }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.display,
    fontSize: typography.display,
    lineHeight: typography.display * 1.2,
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.textMuted,
  },
});
