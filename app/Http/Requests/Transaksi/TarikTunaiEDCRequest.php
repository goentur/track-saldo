<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class TarikTunaiEDCRequest extends FormRequest
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
            "anggota" => ['nullable', 'uuid'],
            "tabunganYangDigunakan" => ['required', 'uuid'],
            "nominalBiayaYangDigunakan" => ['required', 'numeric'],
            "tabunganBiayaAdmin" => ['nullable', 'uuid'],
            "nominalBiayaAdmin" => ['required', 'numeric'],
            "keterangan" => ['nullable', 'string'],
        ];
    }
}
