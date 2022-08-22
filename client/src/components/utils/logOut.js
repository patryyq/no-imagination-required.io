import api from '../../api';

const isLocalhost = window.location.hostname === 'localhost'
const url1 = !isLocalhost ? '/backend' : ''
const url2 = !isLocalhost ? '/backend' : 'http://localhost:3000'
const logOut = async () => {
  await api.get(url1 + '/auth/logout', { withCredentials: true }).then((res) => {
    window.location = '/'
    Location.reload(true);
  });

};

const login = async (provider) => {
  let prov = provider === 'gg' ? '/auth/google' : '/auth/facebook'
  if (!isLocalhost) {
    const req = await api.get(url1 + prov, { withCredentials: true, origin: true })
    const data = await req.text()
    console.log(data)
  } else {
    window.location = url2 + prov;
    Location.reload(true);
  }
};

export { logOut, login };
