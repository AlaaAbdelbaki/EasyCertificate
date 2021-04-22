//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;
contract Certificate{

    address owner;
    uint256 numCertificateIssued;

          constructor() {
         owner = msg.sender;
        numCertificateIssued=0;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    struct IssuerData{
        address issuerAddress; //
         string issuerName;//
         uint256 dateRealisation;//
        string numCertificat;//
    }

    struct CertificateBody{
        uint256 id;
        string Specialite;//
        string Session;//
        string Nom;//
        uint256 dateNaissance;//
        string lieuNaissance;//
        string identifiant;//
        string Nationalite;//
        bool isDeleted;
        string numCertificat;//
        uint256 dateRealisation;//
        string userid;
    }


    mapping(uint256 => CertificateBody) public Certificates;
    mapping(uint256 => IssuerData) public Issuers;

    uint256[] public certs;
    uint256[] public iss;

    event Issued(
        string etudiant,
        string certifier,
        uint256 id
    );

    function issueCertificate(
    string memory _etudiant,
    string memory _specialite,
    string memory _session,
    uint256 _dateNaissance,
    string memory _lieuNaissance,
    string memory _identifiant,
    string memory _nationalite,
    uint256 _dateRealisation,
    string memory _numCertificat,
    string memory _userid) onlyOwner public{
        
        Certificates[numCertificateIssued].id = numCertificateIssued;
        Certificates[numCertificateIssued].Specialite = _specialite;
        Certificates[numCertificateIssued].Session = _session;
        Certificates[numCertificateIssued].Nom = _etudiant;
        Certificates[numCertificateIssued].dateNaissance=_dateNaissance;
        Certificates[numCertificateIssued].lieuNaissance=_lieuNaissance;
        Certificates[numCertificateIssued].identifiant=_identifiant;
        Certificates[numCertificateIssued].Nationalite=_nationalite;
        Certificates[numCertificateIssued].isDeleted=false;
        
        Certificates[numCertificateIssued].dateRealisation=_dateRealisation;
            Certificates[numCertificateIssued].numCertificat=_numCertificat;
            Certificates[numCertificateIssued].userid = _userid;
        
        certs.push(numCertificateIssued);

            Issuers[numCertificateIssued].issuerAddress=owner;
            Issuers[numCertificateIssued].issuerName="ESPRIT";
            //Issuers[numCertificateIssued].dateRealisation=_dateRealisation;
            //Issuers[numCertificateIssued].numCertificat=_numCertificat;
             iss.push(numCertificateIssued);

        emit Issued(_etudiant,"ESPRIT",numCertificateIssued);

        numCertificateIssued +=1;

    }
    
    function updateCertificate(uint256 _id,
    string memory _etudiant,
    string memory _specialite,
    string memory _session,
    uint256 _dateNaissance,
    string memory _lieuNaissance,
    string memory _identifiant,
    string memory _nationalite,
    uint256 _dateRealisation,
    string memory _numCertificat
    ) public{
        
        Certificates[_id].Specialite = _specialite;
        Certificates[_id].Session = _session;
        Certificates[_id].Nom = _etudiant;
        Certificates[_id].dateNaissance=_dateNaissance;
        Certificates[_id].lieuNaissance=_lieuNaissance;
        Certificates[_id].identifiant=_identifiant;
        Certificates[_id].Nationalite=_nationalite;
        
            Issuers[_id].dateRealisation=_dateRealisation;
            Issuers[_id].numCertificat=_numCertificat;
             
        
    }
    
    function deleteCertificate(uint256 _id) onlyOwner public
    {
        Certificates[_id].isDeleted=true;
    }
    
    function activateCertificate(uint256 _id) onlyOwner public
    {
        Certificates[_id].isDeleted=false;
    }

    function getCertificate(uint256 _id)view public returns(string memory,string memory,string memory,uint256,string memory,string memory,string memory){
        CertificateBody memory c = Certificates[_id];
        return(c.Specialite,c.Session,c.Nom,c.dateNaissance,c.lieuNaissance,c.identifiant,c.Nationalite);
    }

    function getIssuer(uint256 _id) view public returns(address,string memory,uint256,string memory){
        IssuerData memory i = Issuers[_id];
        return(i.issuerAddress,i.issuerName,i.dateRealisation,i.numCertificat);
    }

/*,string[] memory _specialite ,string[] memory _session ,uint256[] memory _dateNaissance,string[] memory _lieuNaissance
    
    ,string[] memory _identif,string[] memory _nationalite*/
    
    function getCertificates(string memory _identifiant)view public returns(string[] memory )
    {
        string[] memory _etudiant = new string[](certs.length);
        
        
        for(uint256 i=0;i<certs.length;i++)
        {
            CertificateBody memory c = Certificates[i];
            if(keccak256(abi.encodePacked((c.identifiant))) == keccak256(abi.encodePacked((_identifiant))))
            {
                _etudiant[i] = c.Nom;
                //_specialite[i] = c.Specialite;
                //_session[i] = c.Session;
                //_dateNaissance[i] = c.dateNaissance;
                //_lieuNaissance[i] = c.lieuNaissance;
                //_identif[i] = c.identifiant;
                //_nationalite[i] = c.Nationalite;
            }
        }
        
        return(_etudiant);
        //,_specialite,_session,_dateNaissance,_lieuNaissance,_identif,_nationalite
        
    }

    function verifyCertificate(
    string memory _etudiant,
    string memory _specialite,
    string memory _session,
    uint256 _dateNaissance,
    string memory _lieuNaissance,
    string memory _identifiant,
    string memory _nationalite,
    uint256 _dateRealisation,
    string memory _numCertificat)public view returns(bool) {
        CertificateBody memory diplome = Certificates[numCertificateIssued];
        IssuerData memory issuer = Issuers[numCertificateIssued];
        if(keccak256(abi.encode(issuer.issuerName)) == keccak256(abi.encode("ESPRIT")) &&
            keccak256(abi.encode(diplome.Specialite)) == keccak256(abi.encode(_specialite)) &&
            keccak256(abi.encode(diplome.Session)) == keccak256(abi.encode(_session)) &&
            keccak256(abi.encode(diplome.Nom)) == keccak256(abi.encode(_etudiant)) &&
            keccak256(abi.encode(diplome.dateNaissance)) == keccak256(abi.encode(_dateNaissance)) &&
            keccak256(abi.encode(diplome.lieuNaissance)) == keccak256(abi.encode(_lieuNaissance)) &&
            keccak256(abi.encode(diplome.identifiant)) == keccak256(abi.encode(_identifiant)) &&
            keccak256(abi.encode(diplome.Nationalite)) == keccak256(abi.encode(_nationalite)) &&
            keccak256(abi.encode(issuer.dateRealisation)) == keccak256(abi.encode(_dateRealisation)) &&
            keccak256(abi.encode(issuer.numCertificat)) == keccak256(abi.encode(_numCertificat)) ){

               return true;

            }else
            {
                return false;
            }


    }


    function totalCertificates() view public returns(uint256){
        return numCertificateIssued;
    }

}


