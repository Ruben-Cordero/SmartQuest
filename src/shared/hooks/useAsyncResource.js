import { useEffect, useState } from 'react';

export const ASYNC_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

/**
 * Carga datos asíncronos (por ejemplo, de la API) con estados de carga, error y
 * reintento. Evita repetir en cada pantalla el mismo useEffect con banderas.
 *
 * @param {() => Promise<any>} load función que trae los datos. Debe ser estable
 *   (una función del servicio o envuelta en useCallback); si cambia, se vuelve a cargar.
 * @returns {{ data: any, status: string, error: string, retry: () => void }}
 */
export function useAsyncResource(load) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(ASYNC_STATUS.LOADING);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let activo = true;

    load()
      .then((resultado) => {
        if (!activo) return;
        setData(resultado);
        setStatus(ASYNC_STATUS.SUCCESS);
      })
      .catch((e) => {
        if (!activo) return;
        setData(null);
        setError(e?.message || DEFAULT_ERROR);
        setStatus(ASYNC_STATUS.ERROR);
      });

    return () => {
      activo = false;
    };
  }, [load, attempt]);

  function retry() {
    setStatus(ASYNC_STATUS.LOADING);
    setAttempt((n) => n + 1);
  }

  return { data, status, error, retry };
}
