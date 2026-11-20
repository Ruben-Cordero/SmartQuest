import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ROL_LABELS, ROLES } from '../../../config/roles';
import { colors, fonts, spacing, typography } from '../../../config/theme';
import {
  Avatar,
  ScreenTitle,
  SpaceBackground,
  SpaceButton,
  SpaceCard,
} from '../../../shared/components/space';
import { screenContent } from '../../../shared/styles/layout';
import { useAuth } from '../../auth';

const SIN_DATOS = 'No data';

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
      // Al cerrar sesión, RootNavigator muestra el login y esta pantalla se desmonta.
    } catch {
      setCerrando(false);
    }
  }

  const cursos = Array.isArray(usuario?.cursos)
    ? usuario.cursos.map((c) => c?.nombre).filter(Boolean)
    : [];

  return (
    <SpaceBackground seed="profile">
      <ScrollView contentContainerStyle={screenContent}>
        <View style={styles.hero}>
          <Avatar name={usuario?.nombreCompleto} size={88} />
          <ScreenTitle
            title={valorOSinDatos(usuario?.nombreCompleto)}
            subtitle={valorOSinDatos(ROL_LABELS[rol])}
            align="center"
            style={styles.heroTitle}
          />
        </View>

        <SpaceCard style={styles.card}>
          <Fila etiqueta="Full name">{valorOSinDatos(usuario?.nombreCompleto)}</Fila>
          <Fila etiqueta="Username">{valorOSinDatos(usuario?.username)}</Fila>
          <Fila etiqueta="Role">{valorOSinDatos(ROL_LABELS[rol])}</Fila>
          <Fila etiqueta="School">{valorOSinDatos(usuario?.colegio?.nombre)}</Fila>

          {rol === ROLES.ESTUDIANTE && (
            <Fila etiqueta="Class">{valorOSinDatos(usuario?.curso?.nombre)}</Fila>
          )}

          {rol === ROLES.DOCENTE && (
            <Fila etiqueta="Classes">
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
        </SpaceCard>

        <SpaceButton
          title="Log out"
          variant="danger"
          onPress={cerrarSesion}
          loading={cerrando}
          style={styles.logout}
        />
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  heroTitle: {
    marginTop: spacing.md,
  },
  card: {
    marginTop: spacing.lg,
  },
  row: {
    paddingVertical: spacing.sm,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  value: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.text,
    marginTop: spacing.xs,
  },
  logout: {
    marginTop: spacing.lg,
  },
});
