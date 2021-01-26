// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract wallet {
    struct walletStruct {
        uint256 TransactionID;
        string Description;
        uint256 MunicipalityID;
        uint256 Department;
        uint256 amount;
        string Sender;
        string Receiver;
        string TransactionDate;
    }

    mapping(uint256 => walletStruct) public transactionsMapping;
    uint256 public txnCount;

    constructor() public {
        txnCount = 0;
    }

    function createTxn(
        uint256 _TransactionID,
        string memory _Description,
        uint256 _MunicipalityID,
        uint256 _Department,
        uint256 _amount,
        string memory _Sender,
        string memory _Receiver,
        string memory _TransactionDate
    ) public {
        txnCount++;
        transactionsMapping[txnCount] = walletStruct(
            _TransactionID,
            _Description,
            _MunicipalityID,
            _Department,
            _amount,
            _Sender,
            _Receiver,
            _TransactionDate
        );
    }

    function getTxnByID(uint256 _txnID)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        for (uint256 i = 1; i <= txnCount; i++) {
            walletStruct memory _walletStruct = transactionsMapping[i];
            if (_walletStruct.TransactionID == _txnID) {
                return (
                    _walletStruct.MunicipalityID,
                    _walletStruct.Description,
                    _walletStruct.MunicipalityID,
                    _walletStruct.Department,
                    _walletStruct.amount,
                    _walletStruct.Sender,
                    _walletStruct.Receiver,
                    _walletStruct.TransactionDate
                );
            }
        }
    }
}
