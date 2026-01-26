import { useEffect, type ReactNode } from 'react';
import { initPostHog } from '@/lib/posthog';

interface Props {
  children?: ReactNode;
}

export default function PostHogProvider({ children }: Props) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}
