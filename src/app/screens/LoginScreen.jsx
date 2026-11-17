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

import { USE_MOCK } from '../../config/apiConfig';
import { colors, fonts, layout, radius, spacing, typography } from '../../config/theme';
import {
  Button3D,
  InkCard,
  MessageBubble,
  PaperBackground,
  TitleBanner,
} from '../../shared/components/vintage';
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
      setError('Enter your username and password.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await login(usuarioIngresado.trim(), passwordIngresada);
      // Con login exitoso, App.jsx reemplaza esta pantalla por la app.
    } catch (e) {
      setError(e?.message || 'Could not log in. Please try again.');
      setEnviando(false);
    }
  }

  const mensajeError = error || aviso;

  return (
    <PaperBackground edges={['top', 'bottom', 'left', 'right']} inkTop={false}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.column}>
            <TitleBanner title="SmartQuest" sunburst />

            <MessageBubble style={styles.greeting}>Hi, explorer! Log in to take off.</MessageBubble>

            <InkCard style={styles.form}>
              <Text style={styles.label} nativeID="labelUsuario">
                Username
              </Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Your username"
                placeholderTextColor={colors.sepia}
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
                  placeholderTextColor={colors.sepia}
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

              <Button3D
                title="Log in"
                onPress={() => ingresar(username, password)}
                disabled={!camposCompletos}
                loading={enviando}
                style={styles.submit}
              />
            </InkCard>

            {USE_MOCK && (
              <View style={styles.mockSection}>
                <Text style={styles.mockTitle}>Quick access (test mode)</Text>
                <Button3D
                  title="Enter as student"
                  variant="secondary"
                  disabled={enviando}
                  onPress={() =>
                    ingresar(MOCK_ACCOUNTS.ESTUDIANTE.username, MOCK_ACCOUNTS.ESTUDIANTE.password)
                  }
                />
                <Button3D
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
    </PaperBackground>
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
  greeting: {
    marginTop: spacing.lg,
  },
  form: {
    marginTop: spacing.md,
  },
  label: {
    fontFamily: fonts.game,
    fontSize: typography.body,
    lineHeight: typography.body * 1.3,
    color: colors.tinta,
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    minHeight: layout.minTouchSize,
    borderWidth: layout.inkBorder,
    borderColor: colors.tinta,
    borderRadius: radius.ink,
    paddingHorizontal: spacing.md,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.tinta,
    backgroundColor: colors.papel,
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
    fontFamily: fonts.game,
    fontSize: typography.body,
    color: colors.tinta,
    textDecorationLine: 'underline',
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
    fontFamily: fonts.detail,
    fontSize: typography.body,
    color: colors.sepia,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  mockButton: {
    marginTop: spacing.sm,
  },
});
