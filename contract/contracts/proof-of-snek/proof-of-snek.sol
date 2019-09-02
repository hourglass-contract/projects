pragma solidity 0.5.11;

/*
*
* Proof of Snek
* Card game played with a bit of luck and a dose of FOMO
*
* Draw one of four cards at random
* Each card multiplies amount sent by the card type
* Draw a Snek Card to activate the Jackpot's Countdown Timer
* Be the last player to draw a Snek card when the Countdown reaches zero to win the Jackpot
*
*/

contract ProofOfSnek {

    /* ==== INTERFACE ==== */
    HourglassInterface internal hourglass;

    /* ==== EVENTS ==== */
    event OnAffiliatePayout(
        address indexed _affiliate,
        uint256 _amount,
        uint256 _timestamp
    );

    event OnContribution(
        address indexed _contributor,
        uint256 _amount,
        uint256 _timestamp
    );

    event OnCountdownActivated(
        address indexed _player,
        uint256 _timestamp
    );

    event OnDrawCard(
        address indexed _player,
        uint256 indexed _result,
        uint256 _value,
        bytes32 _playerName,
        uint256 _timestamp
    );

    event OnJackpotWon(
        address indexed _player,
        bytes32 _playerName,
        uint256 _amount,
        uint256 _timestamp
    );

    event OnNewAffiliate(
        address indexed _player,
        uint256 _timestamp
    );

    event OnNewJackpotActivationAmount(
        address _owner,
        uint256 _jackpotActivationAmount,
        uint256 _timestamp
    );

    event OnNewMinBet(
        address _owner,
        uint256 _minBet,
        uint256 _timestamp
    );

    event OnNewOwnershipCost(
        address _owner,
        uint256 _ownershipCost,
        uint256 _timestamp
    );

    event OnNewPlayerName(
        address indexed _playerAddress,
        bytes32 _playerName,
        uint256 _timestamp
    );

    event OnNewOwnership(
        address indexed _owner,
        uint256 _amount,
        uint256 _timestamp
    );

    event OnWithdrawContribution(
        address indexed _contributorAddress,
        uint256 _amountWithdrawn,
        uint256 _timestamp
    );

    /* ==== GLOBALS ==== */
    uint256 public costToSetPlayerName;
    uint256 public minBet;
    uint256 public jackpotActivationAmount;
    uint256 public jackpotClock;
    address payable public jackpotWallet;
    address payable public owner;
    uint256 public ownershipCost;

    /* ==== MAPPINGS ==== */
    mapping (address => bool) affiliates;
    mapping (address => bytes32) playerBook;
    mapping (address => uint256) contributor;

    /* ==== CONSTRUCTOR ==== */
    constructor(
        uint256 _costToSetPlayerName,
        uint256 _jackpotActivationAmount,
        address _hourglassAddress,
        uint256 _minBet,
        uint256 _ownershipCost
    )
        public
    {
        costToSetPlayerName = _costToSetPlayerName;
        jackpotActivationAmount = _jackpotActivationAmount;
        hourglass = HourglassInterface(_hourglassAddress);
        minBet = _minBet;
        owner = msg.sender;
        ownershipCost = _ownershipCost;
    }

    /* ==== MODIFIERS ==== */
    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Externally Owned Accounts only");
        _;
    }

    modifier onlyGasLimit() {
        require(gasleft() > 75000, "Minimum gas required");
        _;
    }

    /* ==== FALLBACK ==== */
    function ()
        external
        payable
    {}

    /* ==== PUBLIC VIEW ==== */
    function getContributorBalance(address contributorAddress)
        public
        view
        returns(uint256 _balance)
    {
        return contributor[contributorAddress];
    }

    function getMaxBet()
        public
        view
        returns(uint256 _maxBet)
    {
        return address(this).balance / 100;
    }

    function getPlayerName(address playerAddress)
        public
        view
        returns(bytes32 playerName)
    {
        return playerBook[playerAddress];
    }

    function getState()
        public
        view
        returns(
            uint256 _balance,
            uint256 _costToSetPlayerName,
            uint256 _jackpotActivationAmount,
            uint256 _jackpotClock,
            address _jackpotWallet,
            uint256 _maxBet,
            uint256 _minBet
        )
    {
        return (
            address(this).balance,
            costToSetPlayerName,
            jackpotActivationAmount,
            jackpotClock,
            jackpotWallet,
            getMaxBet(),
            minBet
        );
    }

    function isValidVanityName(string memory vanityString)
        public
        pure
        returns (bool)
    {
        bytes memory vanityBytes = bytes(vanityString);
        uint256 stringLength = vanityBytes.length;

        // Name must be between 1 and 32 characters
        if (stringLength < 1 || stringLength > 32) {
            return false;
        }

        // Can not begin or end with a space
        if (vanityBytes[0] == 0x20 || vanityBytes[stringLength - 1] == 0x20) {
            return false;
        }

        // Can not begin with the number 0
        if (vanityBytes[0] == 0x30) {
            return false;
        }

        // Validate each character in the name
        for (uint i; i < vanityBytes.length; i++) {
            byte char = vanityBytes[i];

            if (
                !(char >= 0x30 && char <= 0x39) && //0-9
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char == 0x20) && //space
                !(char == 0x5F) && //_
                !(char == 0x2E) //.
            ) {
                return false;
            }
        }

        return true;
    }

    /* ==== PUBLIC WRITE ==== */
    function contribute()
        public
        payable
        onlyEOA()
    {
        contributor[msg.sender] = contributor[msg.sender] + msg.value;

        emit OnContribution(msg.sender, msg.value, block.timestamp);
    }

    function createAffiliate()
        public
        onlyEOA()
    {
        affiliates[msg.sender] = true;

        emit OnNewAffiliate(msg.sender, block.timestamp);
    }

    function drawCard()
        public
        payable
        onlyGasLimit()
        onlyEOA()
    {
        uint256 value = processValue();
        uint256 random = _drawCard(value);

        if (random != 4) {
            payoutOwner(value / 10);
        }
    }

    function drawCard(address payable affiliateAddress)
        public
        payable
        onlyGasLimit()
        onlyEOA()
    {
        uint256 value = processValue();
        uint256 random = _drawCard(value);

        if (random != 4) {
            payoutAffiliate(affiliateAddress, value / 10);
        }
    }

    function setPlayerName(string memory playerName)
        public
        payable
    {
        _setPlayerName(playerName);

        payoutOwner((msg.value * 50) / 100);
    }

    function setPlayerName(string memory playerName, address payable affiliateAddress)
        public
        payable
    {
        _setPlayerName(playerName);

        uint256 amount = (msg.value * 25) / 100;

        payoutAffiliate(affiliateAddress, amount);
        payoutOwner(amount);
    }

    function withdrawContribution(uint256 amountToWithdraw)
        public
        onlyEOA()
    {
        require(address(this).balance > jackpotActivationAmount, "Contract balance too low");
        require((address(this).balance - jackpotActivationAmount) > amountToWithdraw, "Amount requested too high");
        require(amountToWithdraw <= contributor[msg.sender], "Amount requested too high");

        if (amountToWithdraw == contributor[msg.sender]) {
            delete contributor[msg.sender];
        } else {
            contributor[msg.sender] = contributor[msg.sender] - amountToWithdraw;
        }

        msg.sender.transfer(amountToWithdraw);

        emit OnWithdrawContribution(msg.sender, amountToWithdraw, block.timestamp);
    }

    /* ==== OWNER ==== */
    function takeOwnership()
        public
        payable
        onlyEOA()
    {
        require(msg.value >= ownershipCost, "Send more ETH");

        owner.transfer(msg.value);

        owner = msg.sender;

        emit OnNewOwnership(owner, msg.value, block.timestamp);
    }

    function setMinBet(uint256 _minBet)
        public
    {
        require(jackpotClock == 0, "No changes during Jackpot Countdown");
        require(_minBet > 1000000000, "Set a higher minimum");

        if (msg.sender == owner) {
            minBet = _minBet;

            emit OnNewMinBet(owner, minBet, block.timestamp);
        }
    }

    function setJackpotActivationAmount(uint256 _jackpotActivationAmount)
        public
    {
        if (msg.sender == owner) {
            jackpotActivationAmount = _jackpotActivationAmount;

            emit OnNewJackpotActivationAmount(owner, jackpotActivationAmount, block.timestamp);
        }
    }

    function setOwnershipCost(uint256 _ownershipCost)
        public
    {
        if (msg.sender == owner) {
            ownershipCost = _ownershipCost;

            emit OnNewOwnershipCost(owner, ownershipCost, block.timestamp);
        }
    }

    // REMEMBER TO REMOVE THIS BEFORE DEPLOYING TO MAIN NET
    // REMEMBER TO REMOVE THIS BEFORE DEPLOYING TO MAIN NET
    // REMEMBER TO REMOVE THIS BEFORE DEPLOYING TO MAIN NET
    function kill()
        public
    {
        if (msg.sender == owner) {
            selfdestruct(msg.sender);
        }
    }
    // REMEMBER TO REMOVE THIS BEFORE DEPLOYING TO MAIN NET

    /* ==== PRIVATE ==== */
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

    function processValue()
        private
        returns(uint256)
    {
        uint256 value;

        if (value > getMaxBet()) {
            uint256 maxBet = getMaxBet();
            value = maxBet;

            if (minBet > maxBet) {
                minBet = maxBet;
            }

            msg.sender.transfer(msg.value - maxBet);
        } else {
            value = msg.value;
        }

        require(value >= minBet, "Amount sent too low");

        return value;
    }

    function jackpotWinner()
        private
    {
        address payable _jackpotWallet = jackpotWallet;

        delete jackpotClock;
        delete jackpotWallet;

        uint256 amountWon = (address(this).balance * 50) / 100;
        _jackpotWallet.transfer(amountWon);

        hourglass.buy.value((amountWon * 10) / 100)(owner);
        hourglass.exit();

        emit OnJackpotWon(msg.sender, getPlayerName(msg.sender), amountWon, block.timestamp);
    }

    function payoutAffiliate(address payable affiliateAddress, uint256 amount)
        private
    {
        if (affiliates[affiliateAddress] && affiliateAddress != msg.sender) {
            affiliateAddress.transfer(amount);
            emit OnAffiliatePayout(affiliateAddress, amount, block.timestamp);
        } else {
            payoutOwner(amount);
        }
    }

    function payoutOwner(uint256 amount)
        private
    {
        owner.transfer(amount);

        emit OnAffiliatePayout(owner, amount, block.timestamp);
    }

    function _setPlayerName(string memory playerName)
        private
    {
        require(msg.value >= costToSetPlayerName, "Amount sent too low");
        require(isValidVanityName(playerName), "Invalid player name");

        bytes32 vanity32;
        assembly {
            vanity32 := mload(add(playerName, 32))
        }

        playerBook[msg.sender] = vanity32;

        emit OnNewPlayerName(msg.sender, vanity32, block.timestamp);
    }

    function _drawCard(uint256 value)
        private
        returns (uint256)
    {
        if (jackpotClock > 0 && jackpotClock < block.timestamp) {
            jackpotWinner();
        }

        uint256 random = getRandom(4);

        if (random == 1) {
            msg.sender.transfer(((value * 175) / 100) + 1 wei);
        }
        if (random == 2) {
            msg.sender.transfer(((value * 125) / 100) + 1 wei);
        }
        if (random == 3) {
            msg.sender.transfer(((value * 50) / 100) + 1 wei);
        }
        if (random == 4) {
            if (jackpotClock > 0 && jackpotWallet != msg.sender) {
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

                emit OnCountdownActivated(msg.sender, block.timestamp);
            }
        }

        emit OnDrawCard(msg.sender, random, value, getPlayerName(msg.sender), block.timestamp);

        return random;
    }
}

interface HourglassInterface {
    function buy(address _playerAddress) external payable returns(uint256);
    function exit() external;
}