import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ROL_LABELS, ROLES } from '../../config/roles';
import { colors, fonts, layout, spacing, typography } from '../../config/theme';
import { Button3D, InkCard, PaperBackground, TitleBanner } from '../../shared/components/vintage';
import { useAuth } from '../../shared/context/AuthContext';

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
      // Al cerrar sesión, App.jsx muestra el login y esta pantalla se desmonta.
    } catch {
      setCerrando(false);
    }
  }

  const cursos = Array.isArray(usuario?.cursos)
    ? usuario.cursos.map((c) => c?.nombre).filter(Boolean)
    : [];

  return (
    <PaperBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleBanner title={valorOSinDatos(usuario?.nombreCompleto)} sunburst />

        <InkCard style={styles.card}>
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
        </InkCard>

        <Button3D
          title="Log out"
          variant="danger"
          onPress={cerrarSesion}
          loading={cerrando}
          style={styles.logout}
        />
      </ScrollView>
    </PaperBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  card: {
    marginTop: spacing.lg,
  },
  row: {
    paddingVertical: spacing.sm,
  },
  label: {
    fontFamily: fonts.detail,
    fontSize: typography.body,
    color: colors.sepia,
  },
  value: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.tinta,
    marginTop: spacing.xs,
  },
  logout: {
    marginTop: spacing.lg,
  },
});
