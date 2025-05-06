'use client';

type AuthWrapperProps = {
  children: React.ReactNode;
};

import AuthProvider from './AuthProvider';

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;
