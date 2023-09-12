#!/bin/bash
source .env
typechain --target ethers-v5 --out-dir src/contracts "$CONTRACTS_PATH/?(FxGenArt721.sol|FxIssuerFactory.sol|ISplitsMain.sol)/*.json"
