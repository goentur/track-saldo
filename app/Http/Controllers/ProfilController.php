<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfilController extends Controller
{
    public function index()
    {
        return inertia('Profil/Index');
    }
    public function ubahPassword(Request $request)
    {
        $request->validate([
            'passwordLama' => 'required|string',
            'passwordBaru' => 'required|string|min:8',
            'konfirmasiPasswordBaru' => 'required|string|min:8|same:passwordBaru',
        ]);
        if (!Hash::check($request->passwordLama, auth()->user()->password)) {
            return back()->with("error", "Pasword lama tidak cocok!");
        }
        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->passwordBaru)
        ]);

        return back()->with("success", "Password berhasil diubah!");
    }
}
