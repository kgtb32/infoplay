#!/bin/bash

su - postgres -c psql -c "createuser infoplay;"
su - postgres -c psql -c "createdb infoplay;"
sudo usermod -a -G sudo infoplay
sudo -u postgres psql -c "ALTER ROLE infoplay WITH password 'infoplay'"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE infoplay TO infoplay;"
sudo -u postgres psql -c "ALTER DATABASE infoplay OWNER to infoplay"