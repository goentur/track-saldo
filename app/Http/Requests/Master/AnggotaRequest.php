<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class AnggotaRequest extends FormRequest
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
            'id' => ['nullable', 'uuid'],
            'toko_id' => ['required', 'uuid'],
            'nama' => ['required', 'string'],
            'telp' => ['required', 'string'],
            'alamat' => ['required', 'string'],
        ];
    }
}