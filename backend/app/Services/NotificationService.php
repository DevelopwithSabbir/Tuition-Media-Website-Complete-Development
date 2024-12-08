<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\DB;

class NotificationService
{
    public function send($userId, $type, $message, $data = [])
    {
        return DB::transaction(function () use ($userId, $type, $message, $data) {
            return Notification::create([
                'user_id' => $userId,
                'type' => $type,
                'message' => $message,
                'data' => json_encode($data),
                'read_at' => null
            ]);
        });
    }

    public function markAsRead($notificationId)
    {
        $notification = Notification::findOrFail($notificationId);
        $notification->update(['read_at' => now()]);
        return $notification;
    }

    public function getUnreadCount($userId)
    {
        return Notification::where('user_id', $userId)
            ->whereNull('read_at')
            ->count();
    }
}