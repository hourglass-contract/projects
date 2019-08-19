pragma solidity 0.5.11;

/*
*
* Proof of Snek is a game of luck played with ETH and a touch of FOMO
*
* Draw one of four cards at random
* Each card multiplies the amount of ETH sent by the card type
* Drawing a Snek card activates the Jackpot Countdown
* Be the last player to draw a Snek card when the Countdown reaches zero to win the Jackpot
*
*/

contract ProofOfSnek {
    // Emit event for each spin
    event OnSpin(
        address indexed _player,
        uint256 indexed _result
    );

    // Emit event for each Jackpot
    event OnJackpot(
        address indexed _player,
        uint256 _amount
    );

    event OnCountdownActivated(
        uint256 _timestamp
    );

    // Minimum amount needed to activate the Jackpot
    uint256 public activationAmount = 2 ether;

    // Cost to become an affiliate
    uint256 public affiliateCost;

    // Cost to play
    uint256 public costToPlay;

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

    constructor(uint256 _costToPlay, uint256 _affiliateCost, uint256 _ownershipCost)
        public
    {
        owner = msg.sender;
        costToPlay = _costToPlay;
        affiliateCost = _affiliateCost;
        ownershipCost = _ownershipCost;
    }

    function createAffiliate()
        public
        payable
    {
        // Attempt to prevent contracts from becoming affiliates
        require(msg.sender == tx.origin, "Sender not authorized");
        require(msg.value >= affiliateCost);

        affiliates[msg.sender] = true;
    }

    function spin(address payable affiliateAddress)
        public
        payable
    {
        _spin();

        if (affiliates[affiliateAddress]) {
            affiliateAddress.transfer(costToPlay / 10);
        }
    }

    function spin()
        public
        payable
    {
        _spin();
    }

    // ==== CONTRACT OWNERSHIP ==== //
    function takeOwnership()
        public
        payable
    {
        require(msg.value >= ownershipCost, "Amount sent too low");

        owner.transfer(ownershipCost);

        owner = msg.sender;
    }

    function transferOwnership(address payable newOwner)
        public
    {
        if (msg.sender == owner) {
            owner = newOwner;
        }
    }

    function setCostToPlay(uint256 newCostToPlay)
        public
    {
        if (msg.sender == owner) {
            costToPlay = newCostToPlay;
        }
    }

    function setAffiliateCost(uint256 newAffiliateCost)
        public
    {
        if (msg.sender == owner) {
            affiliateCost = newAffiliateCost;
        }
    }

    /* ==== PRIVATE ==== */

    function _spin()
        private
    {
        require(msg.sender == tx.origin, "Sender not authorized");
        require(msg.value >= costToPlay, "Amount sent too low");

        if (jackpotClock > 0 && jackpotClock < now) {
            jackpotWinner();
        }

        uint256 random = getRandom(4);

        if (random == 1) {
            // win 175%
            msg.sender.transfer(((costToPlay * 175) / 100) + 1 wei);
        }
        if (random == 2) {
            // win 125%
            msg.sender.transfer(((costToPlay * 125) / 100) + 1 wei);
        }
        if (random == 3) {
            // win 50%
            msg.sender.transfer(((costToPlay * 50) / 100) + 1 wei);
        }
        if (random == 4) {
            // goodluck winning the jackpot
            if (jackpotClock > 0 && jackpotClock < now + 24 hours) {
                jackpotClock = now + 1 hours;

                if (jackpotClock > now + 24 hours) {
                    jackpotClock = now + 24 hours;
                }

                jackpotWallet = msg.sender;
            }
            if (jackpotClock == 0 && address(this).balance > activationAmount) {
                jackpotClock = now + 24 hours;

                jackpotWallet = msg.sender;

                emit OnCountdownActivated(now);
            }
        }

        emit OnSpin(msg.sender, random);
    }

    function jackpotWinner()
        private
    {
        // Jackpot
        address payable _jackpotWallet = jackpotWallet;
        uint256 amountWon = (address(this).balance) / 2;

        delete jackpotClock;
        delete jackpotWallet;

        _jackpotWallet.transfer(amountWon);
        owner.transfer(amountWon / 10);

        emit OnJackpot(msg.sender, amountWon);
    }

    function getRandom(uint256 max)
        private
        view
        returns(uint256)
    {
        uint256 blockhash_ = uint256(blockhash(block.number-1));
        uint256 balance = address(this).balance;

        uint256 random = uint256(keccak256(abi.encodePacked(
            now,
            block.coinbase,
            block.difficulty,
            blockhash_,
            balance
        ))) % max;

        return random + 1;
    }
}