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
    public function get(array $where)
    {
        return $this->transfer->get($where);
    }
    public function getWhere(array $select, $where)
    {
        return $this->transfer->getWhere($select, $where);
    }
    public function getWhereDetail(array $select, $where)
    {
        return $this->transfer->getWhereDetail($select, $where);
    }
    public function getOnlyOne($id)
    {
        return $this->transfer->getOnlyOne($id);
    }
}
