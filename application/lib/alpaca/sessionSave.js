({ login, session }) => {
  if (session.idToken !== undefined) {
    api.auth.provider.createSession(
      session.idToken.jwtToken,
      { login, payload: session.idToken.payload },
      {
        login,
        type: 'idToken',
        ip: session.idToken.payload['custom:signupIPAddress'] || '',
        expired: new Date(session.idToken.payload.exp * 1000),
      },
    );
  }
  if (session.refreshToken !== undefined) {
    api.auth.provider.createSession(
      session.refreshToken.token,
      { login, payload: {} },
      {
        login,
        type: 'refreshToken',
        ip: session.idToken.payload['custom:signupIPAddress'] || '',
      },
    );
  }
  if (session.accessToken !== undefined) {
    api.auth.provider.createSession(
      session.accessToken.jwtToken,
      { login, payload: session.accessToken.payload },
      {
        login,
        type: 'accessToken',
        ip: session.idToken.payload['custom:signupIPAddress'] || '',
        expired: new Date(session.accessToken.payload.exp * 1000),
      },
    );
  }
  return true;
};
