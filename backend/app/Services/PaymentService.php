<?php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    public function processPayment($data)
    {
        return DB::transaction(function () use ($data) {
            $payment = Payment::create([
                'amount' => $data['amount'],
                'payment_method' => $data['payment_method'],
                'transaction_id' => $data['transaction_id'],
                'status' => 'pending',
                'payer_id' => $data['payer_id'],
                'payer_type' => $data['payer_type'],
                'purpose' => $data['purpose']
            ]);

            // Create activity log
            DB::table('activity_logs')->insert([
                'user_id' => $data['payer_id'],
                'activity_type' => 'payment',
                'description' => "Payment of {$data['amount']} BDT initiated",
                'created_at' => now()
            ]);

            return $payment;
        });
    }

    public function verifyPayment($paymentId)
    {
        return DB::transaction(function () use ($paymentId) {
            $payment = Payment::findOrFail($paymentId);
            $payment->update(['status' => 'completed']);

            // Create activity log
            DB::table('activity_logs')->insert([
                'user_id' => $payment->payer_id,
                'activity_type' => 'payment_verified',
                'description' => "Payment of {$payment->amount} BDT verified",
                'created_at' => now()
            ]);

            return $payment;
        });
    }
}