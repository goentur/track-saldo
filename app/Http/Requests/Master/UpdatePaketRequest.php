<?php

namespace App\Http\Requests\Master;

use App\Enums\TipePaket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePaketRequest extends FormRequest
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
            'toko' => ['required', 'uuid'],
            'tipePaket' => ['required', Rule::enum(TipePaket::class)],
            'nama' => ['required', 'string'],
            'nominal' => ['required', 'numeric'],
        ];
    }
}
