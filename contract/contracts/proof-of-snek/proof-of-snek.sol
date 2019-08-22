pragma solidity 0.5.11;

/*
*
* Proof of Snek
* Game played with a bit of luck and a dose of FOMO
*
* Draw one of four cards at random
* Each card multiplies the amount of ETH sent by the card type
* Draw a Snek Card to activate the Jackpot Countdown (minimum activation amount required)
* Be the last player to draw a Snek card when the Countdown reaches zero to win the Jackpot
*
*/

contract ProofOfSnek {
    // Emit event for each card drawn
    event OnDraw(
        address indexed _player,
        uint256 indexed _result
        uint256 _timestamp
    );

    // Emit event when the Jackpot Countdown is activated
    event OnCountdownActivated(
        uint256 _timestamp
    );

    // Emit event for each Jackpot
    event OnJackpot(
        address indexed _player,
        uint256 _amount
        uint256 _timestamp
    );

    // Cost to become an affiliate
    uint256 public affiliateCost;

    // Cost to play
    uint256 public minBet;

    // Minimum amount needed to activate the Jackpot
    uint256 public jackpotActivationAmount;

    // Jackpot Clock
    uint256 public jackpotClock;

    // Wallet staking the Jackpot
    address payable public jackpotWallet;

    // Contract Owner
    address payable public owner;

    // Cost to take ownership
    uint256 public ownershipCost;

    // Affiliates
    mapping (address => bool) affiliates;

    // ETH sent directly to the contract
    function ()
        external
        payable
    {}

    constructor(uint256 _affiliateCost, uint256 _jackpotActivationAmount, uint256 _minBet, uint256 _ownershipCost)
        public
    {
        affiliateCost = _affiliateCost;
        jackpotActivationAmount = _jackpotActivationAmount;
        minBet = _minBet;
        owner = msg.sender;
        ownershipCost = _ownershipCost;
    }

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "only Externally Owned Accounts");
        _;
    }

    function getState() 
        public
        view
        returns(
            uint256 _affiliateCost,
            uint256 _balance,
            uint256 _jackpotActivationAmount,
            uint256 _jackpotClock,
            uint256 _jackpotWallet,
            uint256 _maxBet
        )
    {
        return (
            affiliateCost,
            address(this).balance,
            jackpotActivationAmount,
            jackpotClock,
            jackpotWallet,
            getMaxBet(),
            minBet
        )
    }

    function getMaxBet() 
        public
        view
        returns(uint256)
    {
        return address(this).balance / 100;
    }

    function createAffiliate()
        public
        payable
        onlyEOA()
    {
        require(msg.value >= affiliateCost);

        // buy and sell p3d here

        affiliates[msg.sender] = true;

        owner.transfer(msg.value / 2);
    }

    function spin(address payable affiliateAddress)
        public
        payable
        onlyEOA()
    {
        _spin();

        if (affiliates[affiliateAddress]) {
            affiliateAddress.transfer(msg.value / 10);
        } else {
            owner.transfer(msg.value / 10);
        }
    }

    function spin()
        public
        payable
        onlyEOA()
    {
        _spin();

        owner.transfer(msg.value / 10);
    }

    // ==== CONTRACT OWNERSHIP ==== //
    function takeOwnership()
        public
        payable
        onlyEOA()
    {
        require(msg.value >= ownershipCost, "Send more ETH");

        owner.transfer(ownershipCost);

        owner = msg.sender;
    }

    function setAffiliateCost(uint256 _affiliateCost)
        public
    {
        if (msg.sender == owner) {
            affiliateCost = _affiliateCost;
        }
    }

    function setMinBet(uint256 _minBet)
        public
    {
        require(jackpotClock == 0, "Not during Jackpot Countdown");

        if (msg.sender == owner) {
            minBet = _minBet;
        }
    }

    function setJackpotActivationAmount(uint256 _jackpotActivationAmount)
        public
    {
        if (msg.sender == owner) {
            jackpotActivationAmount = _jackpotActivationAmount;
        }
    }

    /* ==== PRIVATE ==== */

    function _spin()
        private
    {
        require(msg.value >= minBet, "Amount sent too low");
        require(msg.value <= getMaxBet(), "Amount sent too high");

        if (jackpotClock > 0 && jackpotClock < block.timestamp) {
            jackpotWinner();
        }

        uint256 random = getRandom(4);

        if (random == 1) {
            // win 175%
            msg.sender.transfer(((msg.value * 175) / 100) + 1 wei);
        }
        if (random == 2) {
            // win 125%
            msg.sender.transfer(((msg.value * 125) / 100) + 1 wei);
        }
        if (random == 3) {
            // win 50%
            msg.sender.transfer(((msg.value * 50) / 100) + 1 wei);
        }
        if (random == 4) {
            // Goodluck winning the Jackpot
            if (jackpotClock > 0) {
                if (jackpotClock < block.timestamp + 23 hours) {
                    jackpotClock = block.timestamp + 1 hours;
                } else {
                    jackpotClock = block.timestamp + 24 hours;
                }

                jackpotWallet = msg.sender;
            }
            if (jackpotClock == 0 && address(this).balance > jackpotActivationAmount) {
                jackpotClock = block.timestamp + 24 hours;

                jackpotWallet = msg.sender;

                emit OnCountdownActivated(block.timestamp);
            }
        }

        emit OnDraw(msg.sender, random, block.timestamp);
    }

    function jackpotWinner()
        private
    {
        // Jackpot
        address payable _jackpotWallet = jackpotWallet;
        uint256 amountWon = (address(this).balance) / 2;

        delete jackpotClock;
        delete jackpotWallet;

        // buy and sell p3d here
        _jackpotWallet.transfer(amountWon);

        emit OnJackpot(msg.sender, amountWon, block.timestamp);
    }

    function getRandom(uint256 max)
        private
        view
        returns(uint256)
    {
        uint256 blockhash_ = uint256(blockhash(block.number-1));
        uint256 balance = address(this).balance;

        uint256 random = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.coinbase,
            block.difficulty,
            blockhash_,
            balance
        ))) % max;

        return random + 1;
    }
}