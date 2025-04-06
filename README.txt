DEBIAN 12
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

ssh -L 27017:localhost:27017 root@mongo.soul 'lnav /var/log/mongodb/mongod.log '




## Testing Regime

Put the following through a bash script:
```
./cli
./cli add 
./cli a "Fantastic Title"
./cli add  "Fantastic Title" "Boring description"
./cli a --debug  "Fantastic Title" "Boring description" 123
./cli add   "Fantastic Title" "Boring description" 123 10
./cli add   "Causes Error Title" "Wrong Price" 12.3 100
./cli add --debug  "Should Cause Error" "Ran outa time for full validation... allowed wrong Price" 12.3 100
./cli page 
./cli page --save https://www.trademe.co.nz/a/marketplace/music-instruments/cds/new-zealand/artist-t/listing/5249730669 
./cli page        https://www.trademe.co.nz/a/marketplace/music-instruments/cds/new-zealand/artist-t/listing/5249730669 
./cli page --save https://www.trademe.co.nz/a/marketplace/music-instruments/instruments/guitar-bass/guitar-amps/listing/5254820117
./cli addcust
./cli addcust --debug firstname lastame phone email      
./cli find
./cli find junk
./cli findcust tom            
./cli update 
./cli update 67f1d4083403edc9fe2f11c8 "Pile of Utter Junk" "Really nice junk. Unlike this description." 100 50  
./cli delete [options] <_id>                                                     
  page|p [options] <address>                                                 
  list|l                                                                  
  export|e                                                
  help [command]   
