#!/bin/bash
(cd client; sh build.sh)
(cd services/user; sh build.sh)
(cd services/device; sh build.sh)
(cd services/receiver; sh build.sh)
(cd services/log; sh build.sh)