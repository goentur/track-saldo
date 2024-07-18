<?php

namespace App\Services;

use App\Repositories\Transfer\TransferRepositoryInterface;

class TransferService
{
    public function __construct(
        protected TransferRepositoryInterface $transfer,
    ) {
    }

    public function saveTransfer(array $transfer, array $transferDetail)
    {
        return $this->transfer->saveTransfer($transfer, $transferDetail);
    }
}
