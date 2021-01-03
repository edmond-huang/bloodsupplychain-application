if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask 已安装!');
}
	console.log("isMetaMask：",ethereum.isMetaMask);
	let accounts = [];

$(".enableEthereumButton").click(function () {
    getAccount()
});
async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    $('.showAccount').html(account);
}


ethereum.on('accountsChanged', function (accounts) {
    getAccount()
});
ethereum.on('chainChanged', (chainId) => {
    console.log("ChainID为：",chainId.toString())
});

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const contractABI =[
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
				"name": "_model",
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
				"name": "model",
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
];
var contract = new web3.eth.Contract(contractABI, "0x9cdB7d8ea977d379B689DE388E55de0E67d84A61");
console.log("methods为：",contract.methods);


/*2.添加部门*/
function addstation() {
	let resname=document.getElementById('name').value;
	let respass=document.getElementById('pass').value;
    let restype=document.getElementById('type').value;
    let resaddress=document.getElementById('address').value;
	console.log("新的station："+resname,respass,restype,resaddress);
	contract.methods.addstation(resname,respass,restype,resaddress).send({from:accounts[0]}).then(
		function (result) {
			console.log("add_result:",result);
		}
	);
}

function getstation() {
	let resAdd=document.getElementById('getstation').value;
	console.log("查询的信息为："+resAdd);
	contract.methods.getstation(resAdd).call({from:accounts[0]}).then(
		function (result) {
            console.log(result);
			$('.showstation').html(
			"<p>"+ "名字：" +result[0] + " " + "</p>" +
			"<p>"+ "时间：" +result[3]+ " " + "</p>" 
			// "<p>"+ "地址：" +result + " " + "</p>"
			)
		}
	);
}

/*2.添加部门*/
function addrfbag() {
	//let res_station_id=document.getElementById('_station_id').value;
	let res_ownerId=document.getElementById('_ownerId').value;
	let resmdoel=document.getElementById('model').value;
	let resdonorname=document.getElementById('donorname').value;
    let resdonorsex=document.getElementById('donorsex').value;
	let ressite=document.getElementById('site').value;
	let resml=document.getElementById('ml').value;
	let resbloodtype=document.getElementById('bloodtype').value;
	console.log("新的blood："+res_ownerId,resmdoel,resdonorname,resdonorsex,ressite,resml,resbloodtype);
	contract.methods.addrfbag(res_ownerId,resmdoel,resdonorname,resdonorsex,ressite,resml,resbloodtype).send({from:accounts[0]}).then(
		function (result) {
			console.log("add_result:",result);
		}
	);
}

function getblood() {
	let resAdd=document.getElementById('getblood').value;
	console.log("查询的信息为："+resAdd);
	contract.methods.getblood(resAdd).call({from:accounts[0]}).then(
		function (result) {
            console.log(result);
			$('.showblood').html(
			"<p>"+ "血型：" +result[0] + " " + "</p>" +
			"<p>"+ "姓名：" +result[1]+ " " + "</p>" +
			"<p>"+ "性别：" +result[2] + " " + "</p>" +
			"<p>"+ "献血点：" +result[3] + " " + "</p>" +
			"<p>"+ "献血量：" +result[4]+ " " + "</p>" 
			)
		}
	);
}

function addOwnership() {
	let resusehospital=document.getElementById('usehospital').value;
	let resdoctor=document.getElementById('doctor').value;
    let resreason=document.getElementById('reason').value;
	console.log("新的station："+resusehospital,resdoctor,resreason);
	contract.methods.addOwnership(resusehospital,resdoctor,resreason).send({from:accounts[0]}).then(
		function (result) {
			console.log("add_result:",result);
		}
	);
}

function getOwnership() {
	let resAdd=document.getElementById('getOwnership').value;
	console.log("查询的item为："+resAdd);
	contract.methods.getOwnership(resAdd).call({from:accounts[0]}).then(
		function (result) {
            console.log(result);
			$('.showItem').html(
				"<p>"+ "使用医院：" +result[0] + " " + "</p>" +
			"<p>"+ "主治医生：" +result[1]+ " " + "</p>" +
			"<p>"+ "病因：" +result[2] + " " + "</p>"
			)
		}
	);
}


function newOwner() {
	let res_user1Id=document.getElementById('_user1Id').value;
	let res_user2Id=document.getElementById('_user2Id').value;
    let res_rfbagId=document.getElementById('_rfbagId').value;
	console.log("新的station："+res_user1Id,res_user2Id,res_rfbagId);
	contract.methods.newOwner(res_user1Id,res_user2Id,res_rfbagId).send({from:accounts[0]}).then(
		function (result) {
			console.log("add_result:",result);
		}
	);
}

// function getID() {
// 	let resAdd=document.getElementById('getItem').value;
// 	console.log("查询的item为："+res_user1Id,res_user2Id,res_rfbagId);
// 	contract.methods.getstation(resAdd).call({from:accounts[0]}).then(
// 		function (result) {
//             console.log(result);
// 			$('.showItem').html(result)
// 		}
// 	);
// }

console.log(accounts[0]);


