<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class PenghasilanLainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "toko" => ['required', 'uuid'],
            "nominal" => ['required', 'numeric'],
            "anggota" => ['nullable', 'uuid'],
            "tabungan" => ['nullable', 'uuid'],
            "biayaTransfer" => ['nullable', 'numeric'],
            "keterangan" => ['nullable', 'string'],
        ];
    }
}
