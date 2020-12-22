pragma solidity 0.7.0;
contract BloodSupply {
    uint32 public rfbag_id = 0;     //血液ID
    uint32 public station_id = 0;   //血站
    uint32 public owner_id = 0;     //受助者
    
    struct rfbag{
        string modelNum;
        string donorname;
        string donorsex;
        string site;
        address bloodOwner;
        uint256 ml;
        uint32 mfgTimeStamp;
        string bloodType;
    }
    
    mapping(uint32 => rfbag) public rfbags;
    
    struct station{
        string userName;
        string passwd;
        string stationType;
        address stationAddress;
    }
    
    mapping (uint32 => station) public stations;
    
    struct ownership{    // 血液和受助者结合起来
        uint32 rfbagId;
        uint32 ownerId;
        uint32 trxtTimeStamp;
        address bloodOwner;
    }
    
    mapping (uint32 => ownership) public ownerships;   //受助者的所有权
    mapping(uint32 => uint32[]) public rfbagTrack;     //血液的所有权
    
    event TransForOwnership(uint32 rfbagId);
    
     function addstation(string memory _name,string memory _pass,string memory _sType,address _sAdd) public returns(uint32){
        uint32 userId = station_id++;
        stations[userId].userName = _name;
        stations[userId].passwd = _pass;
        stations[userId].stationType = _sType;
        stations[userId].stationAddress = _sAdd;

        return userId;
    }
    
    function getstation(uint32 _station_id) public view returns(string memory,address,string memory,string memory) {
        return(stations[_station_id].userName,stations[_station_id].stationAddress,stations[_station_id].stationType,stations[_station_id].passwd);
    }
    
    function addrfbag(uint32 _ownerId,string memory _modelNum,string memory _donorname,string memory _donorsex,string memory _site, uint256 _bloodml,string memory _btype) public returns(uint32) {
        if(keccak256(abi.encodePacked(stations[_ownerId].stationType)) == keccak256("station")) {
            uint32 rfbagId = rfbag_id++;
            rfbags[rfbagId].modelNum = _modelNum;
            rfbags[rfbagId].donorname = _donorname;
            rfbags[rfbagId].donorsex = _donorsex;
            rfbags[rfbagId].site = _site;
            rfbags[rfbagId].ml = _bloodml;
            rfbags[rfbagId].bloodType = _btype; 
            rfbags[rfbagId].bloodOwner = stations[_ownerId].stationAddress;  //将血液的权限转给血站
            rfbags[rfbagId].mfgTimeStamp = uint32(block.timestamp);
            
            return rfbagId;
        }
    }
    
    modifier onlyOwner(uint32 _rfbagId){
        require(msg.sender == rfbags[_rfbagId].bloodOwner, "");
        _;
    }
    
    function getblood(uint32 _rfbagId) public view returns(string memory,string memory,string memory,string memory,uint256,address,uint32){
      return (rfbags[_rfbagId].modelNum,
        rfbags[_rfbagId].donorname,
        rfbags[_rfbagId].donorsex,
        rfbags[_rfbagId].site,
        rfbags[_rfbagId].ml,
        rfbags[_rfbagId].bloodOwner,
        rfbags[_rfbagId].mfgTimeStamp
        
        );
    }
    
     function newOwner(uint32 _user1Id,uint32 _user2Id, uint32 _rfbagId) onlyOwner(_rfbagId) public returns(bool){
        station memory p1 = stations[_user1Id];
        station memory p2 = stations[_user2Id];
        uint32 ownership_id = owner_id++;
        
        if(keccak256(abi.encodePacked(p1.stationType))== keccak256("rfbag")
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("station")){
            ownerships[ownership_id].rfbagId = _rfbagId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            rfbags[_rfbagId].bloodOwner = p2.stationAddress;
            rfbagTrack[_rfbagId].push(ownership_id);
            emit TransForOwnership(_rfbagId);
            
            return(true);
        }
        else if(keccak256(abi.encodePacked(p1.stationType))==keccak256("station") 
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("station")){
            ownerships[ownership_id].rfbagId = _rfbagId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            rfbags[_rfbagId].bloodOwner = p2.stationAddress;
            rfbagTrack[_rfbagId].push(ownership_id);
            emit TransForOwnership(_rfbagId);
            
            return(true);
        }
        else if(keccak256(abi.encodePacked(p1.stationType))==keccak256("station") 
        && keccak256(abi.encodePacked(p2.stationType)) == keccak256("paitenal")){
            ownerships[ownership_id].rfbagId = _rfbagId;
            ownerships[ownership_id].bloodOwner = p2.stationAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trxtTimeStamp = uint32(block.timestamp);
            rfbags[_rfbagId].bloodOwner = p2.stationAddress;
            rfbagTrack[_rfbagId].push(ownership_id);
            emit TransForOwnership(_rfbagId);
            
            return(true);
        }
        
    }
    // function getProvenance(uint32 _bloodId) external view returns(uint32[] memory){
    //     return bloodTrack[_bloodId];
    // }
    function getOwnership(uint32 _regId) public view returns (uint32,uint32,address,uint32){
        ownership memory r = ownerships[_regId];
        return(r.rfbagId,r.ownerId,r.bloodOwner,r.trxtTimeStamp);
    }
    
}