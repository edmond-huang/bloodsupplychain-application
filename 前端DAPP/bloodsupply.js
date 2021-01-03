const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
const contractABI = [
	[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_usehospital",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_doctor",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_paitenalname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_reason",
                    "type": "string"
                }
            ],
            "name": "addOwnership",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_ownerId",
                    "type": "uint32"
                },
                {
                    "internalType": "string",
                    "name": "_modelNum",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_donorname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_donorsex",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_site",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_bloodml",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_btype",
                    "type": "string"
                }
            ],
            "name": "addrfbag",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pass",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_sType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_sAdd",
                    "type": "address"
                }
            ],
            "name": "addstation",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_user1Id",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "_user2Id",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "_rfbagId",
                    "type": "uint32"
                }
            ],
            "name": "newOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint32",
                    "name": "rfbagId",
                    "type": "uint32"
                }
            ],
            "name": "TransForOwnership",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_rfbagId",
                    "type": "uint32"
                }
            ],
            "name": "getblood",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_regId",
                    "type": "uint32"
                }
            ],
            "name": "getOwnership",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_station_id",
                    "type": "uint32"
                }
            ],
            "name": "getstation",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner_id",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "name": "ownerships",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "rfbagId",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "ownerId",
                    "type": "uint32"
                },
                {
                    "internalType": "string",
                    "name": "usehospital",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "doctor",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "reason",
                    "type": "string"
                },
                {
                    "internalType": "uint32",
                    "name": "trxtTimeStamp",
                    "type": "uint32"
                },
                {
                    "internalType": "address",
                    "name": "bloodOwner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rfbag_id",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "name": "rfbags",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "modelNum",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "donorname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "donorsex",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "site",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "bloodOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "ml",
                    "type": "uint256"
                },
                {
                    "internalType": "uint32",
                    "name": "mfgTimeStamp",
                    "type": "uint32"
                },
                {
                    "internalType": "string",
                    "name": "bloodType",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "rfbagTrack",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "station_id",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "name": "stations",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "userName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "passwd",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "stationType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "stationAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];
var contract = new web3.eth.Contract(contractABI, "0xBa6517BA0394503624b82cF4d654E7821778Efb5");

// $(".getstation").click(function () {
// 	contract.methods.totalSupply().call({from:accounts[0]}).then(
// 		function (result) {
// 			$('.showstation').html(result)
// 		}
// 	);
// });

// $(".getblood").click(function () {
// 	contract.methods.totalSupply().call({from:accounts[0]}).then(
// 		function (result) {
// 			$('.showblood').html(result)
// 		}
// 	);
// });

// $(".getOwnership").click(function () {
// 	contract.methods.totalSupply().call({from:accounts[0]}).then(
// 		function (result) {
// 			$('.Ownership').html(result)
// 		}
// 	);
// });


