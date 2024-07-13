import { createInertiaApp, useForm } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/style.scss';

function auth() {
  const {auth} = useForm().props
  if (auth.user) {
    return true;
  } else {
    return false;
  }
}

createInertiaApp({
  title: (title) => title ? `${title} - TrackSaldo` : `TrackSaldo`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    if (auth) {
      return pages[`./Pages/${name}.jsx`]
    }else{
      return pages['./Pages/Auth/Login.jsx'];
    }
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: '#fff',
  },
});
