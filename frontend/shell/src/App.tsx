import { lazy, Suspense } from 'react';

const AuthApp = lazy(() => import('auth_mfe/AuthApp'));

function App() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <AuthApp />
    </Suspense>
  );
}

export default App;