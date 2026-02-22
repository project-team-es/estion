<?php

namespace App\Policies;

use App\Models\EntrySheet;
use App\Models\User;

class EntrySheetPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EntrySheet $entrysheet): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EntrySheet $entrysheet): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EntrySheet $entrysheet): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EntrySheet $entrysheet): bool
    {
        return $user->id === $entrysheet->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EntrySheet $entrysheet): bool
    {
        return false;
    }
}
