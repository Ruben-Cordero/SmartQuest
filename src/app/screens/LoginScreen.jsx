import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { USE_MOCK } from '../../config/apiConfig';
import { colors, layout, radius, spacing, typography } from '../../config/theme';
import Button from '../../shared/components/Button';
import { useAuth } from '../../shared/context/AuthContext';
import { MOCK_ACCOUNTS } from '../../shared/services/authService';

export default function LoginScreen() {
  const { login, aviso } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const camposCompletos = username.trim() !== '' && password !== '';

  async function ingresar(usuarioIngresado, passwordIngresada) {
    if (enviando) return;
    if (!usuarioIngresado.trim() || !passwordIngresada) {
      setError('Ingresa tu usuario y tu contraseña.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await login(usuarioIngresado.trim(), passwordIngresada);
      // Con login exitoso, App.jsx reemplaza esta pantalla por la app.
    } catch (e) {
      setError(e?.message || 'No se pudo iniciar sesión. Intenta de nuevo.');
      setEnviando(false);
    }
  }

  const mensaje = error || aviso;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title} accessibilityRole="header">
              SmartQuest
            </Text>
            <Text style={styles.subtitle}>Inicia sesión para practicar inglés</Text>

            <Text style={styles.label} nativeID="labelUsuario">
              Usuario
            </Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Tu usuario"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              textContentType="username"
              returnKeyType="next"
              editable={!enviando}
              accessibilityLabelledBy="labelUsuario"
              accessibilityLabel="Usuario"
            />

            <Text style={styles.label} nativeID="labelPassword">
              Contraseña
            </Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Tu contraseña"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={() => ingresar(username, password)}
                editable={!enviando}
                accessibilityLabelledBy="labelPassword"
                accessibilityLabel="Contraseña"
              />
              <Pressable
                onPress={() => setMostrarPassword((valor) => !valor)}
                accessibilityRole="button"
                accessibilityLabel={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                style={styles.toggle}
              >
                <Text style={styles.toggleText}>{mostrarPassword ? 'Ocultar' : 'Mostrar'}</Text>
              </Pressable>
            </View>

            {mensaje ? (
              <View
                style={styles.errorBox}
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
              >
                <Text style={styles.errorText}>{mensaje}</Text>
              </View>
            ) : null}

            <Button
              title="Ingresar"
              onPress={() => ingresar(username, password)}
              disabled={!camposCompletos}
              loading={enviando}
              style={styles.submit}
            />

            {USE_MOCK && (
              <View style={styles.mockSection}>
                <Text style={styles.mockTitle}>Acceso rápido (modo de prueba)</Text>
                <Button
                  title="Entrar como estudiante"
                  variant="secondary"
                  disabled={enviando}
                  onPress={() =>
                    ingresar(MOCK_ACCOUNTS.ESTUDIANTE.username, MOCK_ACCOUNTS.ESTUDIANTE.password)
                  }
                />
                <Button
                  title="Entrar como docente"
                  variant="secondary"
                  disabled={enviando}
                  style={styles.mockButton}
                  onPress={() =>
                    ingresar(MOCK_ACCOUNTS.DOCENTE.username, MOCK_ACCOUNTS.DOCENTE.password)
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    minHeight: layout.minTouchSize,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.background,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  toggle: {
    minHeight: layout.minTouchSize,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.xs,
  },
  toggleText: {
    fontSize: typography.body,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  errorBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.errorBackground,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
  },
  submit: {
    marginTop: spacing.lg,
  },
  mockSection: {
    marginTop: spacing.xl,
  },
  mockTitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  mockButton: {
    marginTop: spacing.sm,
  },
});
