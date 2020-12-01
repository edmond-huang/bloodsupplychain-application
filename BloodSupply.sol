pragma solidity 0.7.0;

contract BloodSupply{
    uint32 public blood_id = 0;
    uint32 public station_id = 0;
    uint32 public owner_id = 0;
    
    struct blood{
        string modelNum;
        string partNum;
        string serialNum;
        address bloodOwner;
        uint32 cost;
        uint32 mfgTimeStamp;
    }
    
    mapping(uint32 => blood) public bloods;
    
    struct station{
        string userName;
        string passwd;
        string stationType;
        address stationAddress;
    }
    
    mapping (uint32 => station) public stations;
    
    struct ownership{
        uint32 bloodId;
        uint32 ownerId;
        uint32 trxtTimeStamp;
        address bloodOwner;
    }
    
    mapping (uint32 => ownership) public ownerships;
    mapping(uint32 => uint32[]) public bloodTrack;
    
    event TransForOwnership(uint32 bloodId);
    
    function addstation(string memory _name,string memory _pass,address _sAdd, string memory _sType) public returns(uint32){
        uint32 userId = station_id++;
        stations[userId].userName = _name;
        stations[userId].passwd = _pass;
        stations[userId].stationAddress = _sAdd;
        stations[userId].stationType = _sType;

        return userId;
    }
    
    function getstation(uint32 _station_id) public view returns(string memory,address,string memory){
        return(stations[_station_id].userName,stations[_station_id].stationAddress,stations[_station_id].stationType);
    }
    
    function addblood(uint32 _ownerId,string memory _modelNum,string memory _partNum,string memory _serialNum,uint32 _bloodCost) public returns(uint32){
        if(keccak256(abi.encodePacked(stations[_ownerId].stationType)) == keccak256("manufacturer")){
            uint32 bloodId = blood_id++;
            bloods[bloodId].modelNum = _modelNum;
            bloods[bloodId].partNum = _partNum;
            bloods[bloodId].serialNum = _serialNum;
            bloods[bloodId].cost = _bloodCost;
            bloods[bloodId].bloodOwner = stations[_ownerId].stationAddress;
            bloods[bloodId].mfgTimeStamp = uint32(block.timestamp);
            
            return bloodId;
        }
    }
    modifier onlyOwner(uint32 _bloodId){
        require(msg.sender == bloods[_bloodId].bloodOwner,"");
        _;
    }
    
    function getblood(uint32 _bloodId) public view returns(string memory,string memory,string memory,uint32,address,uint32){
        return (bloods[_bloodId].modelNum,
        bloods[_bloodId].partNum,
        bloods[_bloodId].serialNum,
        bloods[_bloodId].cost,
        bloods[_bloodId].bloodOwner,
        bloods[_bloodId].mfgTimeStamp
        );
    }
    
    function newOwner(uint32 _user1Id,uint32 _user2Id, uint32 _bloodId) onlyOwner(_bloodId) public returns(bool){
        station memory p1 = stations[_user1Id];
        station memory p2 = stations[_user2Id];
        uint32 ownership_id = owner_id++;
        
        if(keccak256(abi.encodePacked(p1.stationType))== keccak256("manufacturer")
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("supplier")){
            ownerships[ownership_id].bloodId = _bloodId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            bloods[_bloodId].bloodOwner = p2.stationAddress;
            bloodTrack[_bloodId].push(ownership_id);
            emit TransForOwnership(_bloodId);
            
            return(true);
        }
        else if(keccak256(abi.encodePacked(p1.stationType))==keccak256("supplier") 
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("supplier")){
            ownerships[ownership_id].bloodId = _bloodId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            bloods[_bloodId].bloodOwner = p2.stationAddress;
            bloodTrack[_bloodId].push(ownership_id);
            emit TransForOwnership(_bloodId);
            
            return(true);
        }
        else if(keccak256(abi.encodePacked(p1.stationType))==keccak256("supplier") 
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("consumer")){
            ownerships[ownership_id].bloodId = _bloodId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            bloods[_bloodId].bloodOwner = p2.stationAddress;
            bloodTrack[_bloodId].push(ownership_id);
            emit TransForOwnership(_bloodId);
            
            return(true);
        }
        
    }
    function getProvenance(uint32 _bloodId) external view returns(uint32[] memory){
        return bloodTrack[_bloodId];
    }
    function getOwnership(uint32 _regId) public view returns (uint32,uint32,address,uint32){
        ownership memory r = ownerships[_regId];
        return(r.bloodId,r.ownerId,r.bloodOwner,r.trxtTimeStamp);
    }
    
    function authenticateParticipant(uint32 _uid,string memory _uname,string memory _pass,string memory _utype) public view returns(bool){
        if(keccak256(abi.encodePacked(stations[_uid].stationType)) == keccak256(abi.encodePacked(_utype))){
            if(keccak256(abi.encodePacked(stations[_uid].userName))==keccak256(abi.encodePacked(_uname))){
                if(keccak256(abi.encodePacked(stations[_uid].passwd))==keccak256(abi.encodePacked(_pass))){
                    return(true);
                }
            }
        }
        
        return(false);
    }

}