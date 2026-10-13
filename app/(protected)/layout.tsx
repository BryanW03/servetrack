import { redirect } from 'next/navigation';
import { auth } from '@/auth';

// Every route inside the (protected) group requires a signed-in user.
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
