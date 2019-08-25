export default {
	address: '0x8f069ac8499c1c5c20c1bc8a0834d0b294efe6bf',
	abi: [
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
			"name": "OnDraw",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
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
			"name": "OnJackpot",
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