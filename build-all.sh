#!/bin/bash
(cd application/services/user; sh build.sh)
(cd application/services/device; sh build.sh)
(cd application/services/mqtt; sh build.sh)
(cd application/services/log; sh build.sh)