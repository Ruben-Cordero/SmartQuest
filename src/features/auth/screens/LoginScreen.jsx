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

import { USE_MOCK } from '../../../config/apiConfig';
import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';
import {
  MessageBubble,
  Planet,
  ScreenTitle,
  SpaceBackground,
  SpaceButton,
  SpaceCard,
} from '../../../shared/components/space';
import { useAuth } from '../context/AuthContext';
import { MOCK_ACCOUNTS } from '../services/authService.mock';

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
      setError('Enter your username and password.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await login(usuarioIngresado.trim(), passwordIngresada);
      // Con login exitoso, RootNavigator reemplaza esta pantalla por la app.
    } catch (e) {
      setError(e?.message || 'Could not log in. Please try again.');
      setEnviando(false);
    }
  }

  const mensajeError = error || aviso;

  return (
    <SpaceBackground edges={['top', 'bottom', 'left', 'right']} seed="login">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.column}>
            {/* Planeta decorativo (sin etiqueta: los lectores de pantalla lo ignoran) */}
            <Planet
              seed="smartquest-home"
              theme="cyan"
              size={120}
              state="current"
              style={styles.hero}
            />
            <ScreenTitle
              title="SmartQuest"
              subtitle="Your English adventure across the universe."
              align="center"
            />

            <MessageBubble style={styles.greeting}>Hi, explorer! Log in to take off.</MessageBubble>

            <SpaceCard style={styles.form}>
              <Text style={styles.label} nativeID="labelUsuario">
                Username
              </Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Your username"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
                editable={!enviando}
                accessibilityLabelledBy="labelUsuario"
                accessibilityLabel="Username"
              />

              <Text style={styles.label} nativeID="labelPassword">
                Password
              </Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Your password"
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
                  accessibilityLabel="Password"
                />
                <Pressable
                  onPress={() => setMostrarPassword((valor) => !valor)}
                  accessibilityRole="button"
                  accessibilityLabel={mostrarPassword ? 'Hide password' : 'Show password'}
                  style={styles.toggle}
                >
                  <Text style={styles.toggleText}>{mostrarPassword ? 'Hide' : 'Show'}</Text>
                </Pressable>
              </View>

              {mensajeError ? (
                <MessageBubble tone="error" style={styles.error}>
                  {mensajeError}
                </MessageBubble>
              ) : null}

              <SpaceButton
                title="Log in"
                onPress={() => ingresar(username, password)}
                disabled={!camposCompletos}
                loading={enviando}
                style={styles.submit}
              />
            </SpaceCard>

            {USE_MOCK && (
              <View style={styles.mockSection}>
                <Text style={styles.mockTitle}>Quick access (test mode)</Text>
                <SpaceButton
                  title="Enter as student"
                  variant="secondary"
                  disabled={enviando}
                  onPress={() =>
                    ingresar(MOCK_ACCOUNTS.ESTUDIANTE.username, MOCK_ACCOUNTS.ESTUDIANTE.password)
                  }
                />
                <SpaceButton
                  title="Enter as teacher"
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
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  column: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  hero: {
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  greeting: {
    marginTop: spacing.lg,
  },
  form: {
    marginTop: spacing.md,
  },
  label: {
    fontFamily: fonts.heading,
    fontSize: typography.label,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  // El borde usa textMuted (6.9:1) para cumplir el 3:1 de los controles.
  input: {
    minHeight: layout.minTouchSize,
    borderWidth: layout.borderWidth,
    borderColor: colors.textMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
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
    fontFamily: fonts.heading,
    fontSize: typography.body,
    color: colors.primary,
  },
  error: {
    marginTop: spacing.md,
  },
  submit: {
    marginTop: spacing.lg,
  },
  mockSection: {
    marginTop: spacing.xl,
  },
  mockTitle: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  mockButton: {
    marginTop: spacing.sm,
  },
});
