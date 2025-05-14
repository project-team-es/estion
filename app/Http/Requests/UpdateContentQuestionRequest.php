<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Content;
use Illuminate\Validation\Rule;

class UpdateContentQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question' => ['required', 'string', 'max:255'],
            'character_limit' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $contentId = $this->route('content')->id; 
            $newCharacterLimit = $this->input('character_limit');

            if ($contentId && $newCharacterLimit !== null) {
                $content = Content::find($contentId);
                if ($content && $content->answer && mb_strlen($content->answer) > $newCharacterLimit) {
                    $validator->errors()->add('character_limit', '既存の回答が新しい文字数制限を超えています。');
                }
            }
        });
    }
}