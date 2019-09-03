interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'mf_ySU-G3W0ZtuJpPVKyOSUQDkV_qBgF',
  domain: 'pituach.auth0.com',
  callbackURL: 'http://localhost:4200/Home'
};