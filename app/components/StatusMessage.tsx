import { CircleAlert, LoaderCircle } from 'lucide-react';

interface StatusMessageProps {
  tipo: 'loading' | 'error';
  mensagem: string;
}

export default function StatusMessage({ tipo, mensagem }: StatusMessageProps) {
  const carregando = tipo === 'loading';
  const Icone = carregando ? LoaderCircle : CircleAlert;

  return (
    <div
      className={`status-message status-message--${tipo}`}
      role={carregando ? 'status' : 'alert'}
      aria-live={carregando ? 'polite' : 'assertive'}
      aria-atomic="true"
    >
      <Icone
        className={carregando ? 'status-message-icon status-message-icon--loading' : 'status-message-icon'}
        size={22}
        aria-hidden="true"
      />
      <span>{mensagem}</span>
    </div>
  );
}
