<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContentRequest extends FormRequest
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
    public function rules()
    {
        return [
            'question' => 'required|string|max:255',
            'answer' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $characterLimit = $this->input('character_limit'); // ユーザー入力値
                    if ($characterLimit && mb_strlen($value) > $characterLimit) {
                        $fail("回答は {$characterLimit} 文字以内で入力してください。");
                    }
                },
            ],
        ];
    }
}
