<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class TabunganSetorRequest extends FormRequest
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
            "anggota" => ['required', 'uuid'],
            "nominalTabungan" => ['required', 'numeric'],
            "tabunganYangDigunakan" => ['nullable', 'uuid'],
            "keterangan" => ['nullable', 'string'],
        ];
    }
}
