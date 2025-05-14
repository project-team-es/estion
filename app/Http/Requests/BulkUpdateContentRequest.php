<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Content;
use Illuminate\Support\Facades\Validator;

class BulkUpdateContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'answers' => 'array',
            'answers.*' => 'nullable|string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->has('answers')) {
                foreach ($this->input('answers') as $contentId => $answer) {
                    $content = Content::find($contentId);
                    if ($content && $content->character_limit !== null && mb_strlen($answer) > $content->character_limit) {
                        $validator->errors()->add("answers.{$contentId}", "回答は {$content->character_limit} 文字以内で入力してください。");
                    }
                }
            }
        });
    }
}