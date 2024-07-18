<?php

namespace App\Repositories\Transfer;

interface TransferRepositoryInterface
{
    public function saveTransfer(array $transfer, array $transferDetail);
}
