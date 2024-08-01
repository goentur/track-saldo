<!DOCTYPE html>
<html data-bs-theme="white">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <link rel="shortcut icon" href="{{ asset('logo.png') }}" />
  @viteReactRefresh
  @vite(['resources/js/app.jsx'])
  @inertiaHead
  @routes
</head>
<body>
  @inertia
</body>

</html>