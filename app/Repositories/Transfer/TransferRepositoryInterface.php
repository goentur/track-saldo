<?php

namespace App\Repositories\Transfer;

interface TransferRepositoryInterface
{
    public function saveTransfer(array $data, array $dataDetails);
    public function get(array $where);
    public function getWhere(array $select, array $where);
    public function getWhereDetail(array $select, array $where);
    public function getOnlyOne($id);
}
