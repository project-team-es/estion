<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class StoreCompanyRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('companies')->where(function ($query) {
                    return $query->where('user_id', Auth::id());
                }),
            ],
            'homepage' => 'nullable|url|max:255',
            'mypage' => 'nullable|url|max:255',
            'loginid' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:255',
            'process' => 'nullable|string|max:255',
            'industry_id' => 'required|exists:industries,id',
        ];
    }
    public function messages(): array
    {
        return [
            'name.unique' => 'この名前の企業は既に登録されています。',
        ];
    }
}