INSTALATION FOR FIRST TIME AFTER CREATE LARAVEL PROJECT

```bash
npm i react react-dom
```

```bash 
npm install --save-dev @vitejs/plugin-react
```

```bash 
composer require inertiajs/inertia-laravel
```

```bash 
php artisan inertia:middleware
```

DONT FORGET ADD MIDDLEWARE IN bootstrap/app  

```bash
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
})
```

```bash
npm install @inertiajs/react
```

vite.config.js
```bash
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});

```

app.blade.php
```bash
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

app.jsx in resource/js
```bash
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```