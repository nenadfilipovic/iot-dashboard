#!/bin/bash
(rm -rf dist) && tsc && npx pm2-runtime ecosystem.config.json