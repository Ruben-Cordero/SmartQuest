import LoadingState from './LoadingState';
import SpaceBackground from './space/SpaceBackground';

// Pantalla completa de carga (fondo espacial + indicador con mensaje).
export default function LoadingView({ message = 'Loading...' }) {
  return (
    <SpaceBackground edges={['top', 'bottom', 'left', 'right']}>
      <LoadingState message={message} />
    </SpaceBackground>
  );
}
