#!/bin/bash
(rm -rf dist) && tsc && npx pm2 start ecosystem.config.json