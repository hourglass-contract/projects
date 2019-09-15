export default {
	address: {
		ropsten: '0x48bda1e0bebfb84fa0ae5ce13d81cd8f8e14f8a8'
	},
	abi: [
		{
			"constant": false,
			"inputs": [],
			"name": "contribute",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "createAffiliate",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "drawCard",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address payable",
					"name": "affiliateAddress",
					"type": "address"
				}
			],
			"name": "drawCard",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_jackpotActivationAmount",
					"type": "uint256"
				}
			],
			"name": "setJackpotActivationAmount",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_minBet",
					"type": "uint256"
				}
			],
			"name": "setMinBet",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_ownershipCost",
					"type": "uint256"
				}
			],
			"name": "setOwnershipCost",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "string",
					"name": "playerName",
					"type": "string"
				},
				{
					"internalType": "address payable",
					"name": "affiliateAddress",
					"type": "address"
				}
			],
			"name": "setPlayerName",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "string",
					"name": "playerName",
					"type": "string"
				}
			],
			"name": "setPlayerName",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "takeOwnership",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amountToWithdraw",
					"type": "uint256"
				}
			],
			"name": "withdrawContribution",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_costToSetPlayerName",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_jackpotActivationAmount",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_hourglassAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_minBet",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_ownershipCost",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_affiliate",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnAffiliatePayout",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_contributor",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnContribution",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnCountdownActivated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_player",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "_result",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "_playerName",
					"type": "bytes32"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnDrawCard",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "_playerName",
					"type": "bytes32"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnJackpotWon",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewAffiliate",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_jackpotActivationAmount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewJackpotActivationAmount",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_minBet",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewMinBet",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_ownershipCost",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewOwnershipCost",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_playerAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "_playerName",
					"type": "bytes32"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewPlayerName",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnNewOwnership",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_contributorAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_amountWithdrawn",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_timestamp",
					"type": "uint256"
				}
			],
			"name": "OnWithdrawContribution",
			"type": "event"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "costToSetPlayerName",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "contributorAddress",
					"type": "address"
				}
			],
			"name": "getContributorBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_balance",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getMaxBet",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_maxBet",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "playerAddress",
					"type": "address"
				}
			],
			"name": "getPlayerName",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "playerName",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getState",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_balance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_costToSetPlayerName",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_jackpotActivationAmount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_jackpotClock",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_jackpotWallet",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_maxBet",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_minBet",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "string",
					"name": "vanityString",
					"type": "string"
				}
			],
			"name": "isValidVanityName",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "jackpotActivationAmount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "jackpotClock",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "jackpotWallet",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "minBet",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "ownershipCost",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]
}