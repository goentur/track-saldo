<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return inertia('Auth/Login');
    }

    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials, $request->has('remember'))) {
            $request->session()->regenerate();
            $user = auth()->user();
            return redirect()->intended('home');
            // if ($user->hasRole('pemilik')) {
            // } else {
            //     return redirect()->intended('dashboard');
            // };
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * destroy
     *
     * @return void
     */
    public function destroy()
    {
        auth()->logout();

        return redirect('/login');
    }
}
