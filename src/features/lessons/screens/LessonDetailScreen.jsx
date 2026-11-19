// Dueña: Estrella (T09–T11).
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, layout, spacing, typography } from '../../../config/theme';
import { SpaceBackground, SpaceButton, SpaceCard } from '../../../shared/components/space';
import { getLeccion, marcarEstudiado } from '../services/inglesApi';

export default function LessonDetailScreen({ route, navigation }) {
  const lessonId = route?.params?.lessonId;

  const [leccion, setLeccion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [marcando, setMarcando] = useState(false);
  const [estado, setEstado] = useState('PENDIENTE');
  const [errorMarcar, setErrorMarcar] = useState(null);

  // T09: cargar la lección
  const cargarLeccion = useCallback(async () => {
    if (!lessonId) {
      setError('Lesson not found.');
      setCargando(false);
      return;
    }
    setCargando(true);
    setError(null);
    try {
      const data = await getLeccion(lessonId);
      setLeccion(data);
      setEstado(data?.estadoEstudiante ?? 'PENDIENTE');
    } catch (e) {
      const msg = e?.message || '';
      setError(
        msg.toLowerCase().includes('no encontrada') || msg.toLowerCase().includes('not found')
          ? 'Lesson not found.'
          : msg || 'Could not load the lesson. Please try again.',
      );
    } finally {
      setCargando(false);
    }
  }, [lessonId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarLeccion();
  }, [cargarLeccion]);

  // T11: marcar como estudiada
  const onMarcarEstudiado = async () => {
    setMarcando(true);
    setErrorMarcar(null);
    try {
      await marcarEstudiado(lessonId);
      setEstado('ESTUDIADO');
    } catch (e) {
      setErrorMarcar(e?.message || 'Could not mark the lesson as studied. Please try again.');
    } finally {
      setMarcando(false);
    }
  };

  if (cargando) {
    return (
      <SpaceBackground edges={['left', 'right', 'bottom']} seed="lesson">
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Landing on planet...</Text>
        </View>
      </SpaceBackground>
    );
  }

  if (error) {
    return (
      <SpaceBackground edges={['left', 'right', 'bottom']} seed="lesson">
        <View style={styles.center}>
          <Ionicons name="warning-outline" size={48} color={colors.danger} />
          <Text style={styles.errorText}>{error}</Text>
          <SpaceButton title="Return to Galaxy" onPress={() => navigation.goBack()} />
        </View>
      </SpaceBackground>
    );
  }

  const tieneCuestionario = leccion?.tieneCuestionario === true;
  const definicion = leccion?.definicion?.trim();
  const ejemplo = leccion?.ejemplo?.trim();

  return (
    <SpaceBackground edges={['left', 'right', 'bottom']} seed="lesson">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 1. Encabezado Galáctico */}
        <SpaceCard style={styles.headerCard}>
          <Text style={styles.unidadText}>{leccion?.unidad?.titulo || 'Unknown Galaxy'}</Text>
          <View style={styles.titleRow}>
            <Ionicons name="planet" size={28} color={colors.primary} />
            <Text style={styles.title} accessibilityRole="header" testID="lesson-detail-id">
              {leccion?.titulo || `Lesson ${lessonId}`}
            </Text>
          </View>
        </SpaceCard>

        {/* 2. Teoría (Tarjeta Niebla + Gradiente) */}
        <View style={styles.glassWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.98)', 'rgba(240, 245, 255, 0.85)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glassCard}
          >
            <View style={styles.sectionHeader}>
              <Ionicons name="book" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>THEORY</Text>
            </View>
            <View style={styles.separator} />
            {definicion ? (
              <Text style={styles.bodyText}>{definicion}</Text>
            ) : (
              <Text style={styles.emptyText}>No theory available for this lesson.</Text>
            )}
          </LinearGradient>
        </View>

        {/* 3. Ejemplo (Tarjeta Niebla + Gradiente) */}
        {ejemplo ? (
          <View style={styles.glassWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.98)', 'rgba(240, 245, 255, 0.85)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glassCard}
            >
              <View style={styles.sectionHeader}>
                <Ionicons name="bulb" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>EXAMPLE</Text>
              </View>
              <View style={styles.separator} />
              <Text style={styles.bodyText}>{ejemplo}</Text>
            </LinearGradient>
          </View>
        ) : null}

        {/* 4. Acción (T11) */}
        <View style={styles.actionContainer}>
          {tieneCuestionario ? (
            <SpaceCard style={styles.notice}>
              <Ionicons name="trophy" size={24} color={colors.primary} />
              <Text style={styles.noticeText}>
                Completed by passing the quiz
                {leccion?.tiempoLimiteSegundos ? ` (${leccion.tiempoLimiteSegundos}s limit)` : ''}.
                Available in Sprint 2.
              </Text>
            </SpaceCard>
          ) : estado === 'ESTUDIADO' ? (
            <SpaceCard style={styles.success}>
              <Ionicons name="checkmark-circle" size={24} color={colors.energy} />
              <Text style={styles.successText}>Marked as studied</Text>
            </SpaceCard>
          ) : (
            <SpaceButton
              title={marcando ? 'Marking...' : 'Mark as studied'}
              onPress={onMarcarEstudiado}
              disabled={marcando}
            />
          )}
          {errorMarcar ? <Text style={styles.errorText}>{errorMarcar}</Text> : null}
        </View>
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  headerCard: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  unidadText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typography.small,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: typography.title,
    lineHeight: typography.title * 1.2,
    color: '#FFFFFF',
  },
  glassWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  glassCard: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: typography.body,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: spacing.sm,
  },
  bodyText: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 16 * 1.6,
    color: '#1A1A1A',
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: '#1A1A1A',
    fontStyle: 'italic',
  },
  loadingText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.onBackground,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: colors.onSurface,
  },
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: colors.energy,
  },
  successText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.energy,
  },
});
