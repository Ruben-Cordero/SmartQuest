import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ROL_LABELS, ROLES } from '../../config/roles';
import { colors, layout, radius, spacing, typography } from '../../config/theme';
import Button from '../../shared/components/Button';
import { useAuth } from '../../shared/context/AuthContext';

const SIN_DATOS = 'Sin datos';

function valorOSinDatos(valor) {
  return typeof valor === 'string' && valor.trim() !== '' ? valor : SIN_DATOS;
}

function Fila({ etiqueta, children }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{etiqueta}</Text>
      {typeof children === 'string' ? <Text style={styles.value}>{children}</Text> : children}
    </View>
  );
}

export default function ProfileScreen() {
  const { usuario, rol, logout } = useAuth();
  const [cerrando, setCerrando] = useState(false);

  async function cerrarSesion() {
    setCerrando(true);
    try {
      await logout();
      // Al cerrar sesión, App.jsx muestra el login y esta pantalla se desmonta.
    } catch {
      setCerrando(false);
    }
  }

  const cursos = Array.isArray(usuario?.cursos)
    ? usuario.cursos.map((c) => c?.nombre).filter(Boolean)
    : [];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Fila etiqueta="Nombre completo">{valorOSinDatos(usuario?.nombreCompleto)}</Fila>
        <Fila etiqueta="Usuario">{valorOSinDatos(usuario?.username)}</Fila>
        <Fila etiqueta="Rol">{valorOSinDatos(ROL_LABELS[rol])}</Fila>
        <Fila etiqueta="Colegio">{valorOSinDatos(usuario?.colegio?.nombre)}</Fila>

        {rol === ROLES.ESTUDIANTE && (
          <Fila etiqueta="Curso">{valorOSinDatos(usuario?.curso?.nombre)}</Fila>
        )}

        {rol === ROLES.DOCENTE && (
          <Fila etiqueta="Cursos">
            {cursos.length > 0 ? (
              cursos.map((nombre, indice) => (
                <Text key={`${indice}-${nombre}`} style={styles.value}>
                  • {nombre}
                </Text>
              ))
            ) : (
              <Text style={styles.value}>{SIN_DATOS}</Text>
            )}
          </Fila>
        )}
      </View>

      <Button
        title="Cerrar sesión"
        variant="danger"
        onPress={cerrarSesion}
        loading={cerrando}
        style={styles.logout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  card: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  row: {
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  value: {
    fontSize: typography.body,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  logout: {
    marginTop: spacing.lg,
  },
});
