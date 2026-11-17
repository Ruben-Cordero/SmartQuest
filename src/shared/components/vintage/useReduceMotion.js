import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Indica si el usuario activó "reducir movimiento" en su teléfono.
 * Devuelve null mientras se consulta; las animaciones solo deben correr con false.
 */
export default function useReduceMotion() {
  const [reduceMotion, setReduceMotion] = useState(null);

  useEffect(() => {
    let activo = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((valor) => activo && setReduceMotion(valor))
      .catch(() => activo && setReduceMotion(true));

    const suscripcion = AccessibilityInfo.addEventListener('reduceMotionChanged', (valor) => {
      setReduceMotion(valor);
    });

    return () => {
      activo = false;
      suscripcion?.remove();
    };
  }, []);

  return reduceMotion;
}
