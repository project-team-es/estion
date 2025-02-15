<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'industry_id' => 'required|exists:industries,id',
            'homepage' => 'nullable|url',
            'loginid' => 'nullable|string|max:50|unique:companies,loginid',
            'mypage' => 'nullable|url',
            'status' => 'nullable|string|max:255',
            'process' => 'nullable|string|max:255',
            ];
    }
}
