import { StyleSheet, View } from 'react-native';

import { colors, layout, radius as radii } from '../../../config/theme';

/**
 * Sombra dura de dibujo animado: un bloque color tinta desplazado abajo y a la
 * derecha, sin desenfoque. No usa elevation ni shadow*, así que se ve igual en
 * Android y en iOS. El hijo debe tener fondo opaco para tapar el bloque.
 */
export default function HardShadow({
  children,
  radius = radii.ink,
  offset = layout.shadowOffset,
  visible = true,
  style,
}) {
  return (
    <View style={[{ marginRight: offset, marginBottom: offset }, style]}>
      {visible && (
        <View
          pointerEvents="none"
          style={[
            styles.shadow,
            { top: offset, left: offset, right: -offset, bottom: -offset, borderRadius: radius },
          ]}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    backgroundColor: colors.tinta,
  },
});
