#!/bin/bash

MESSAGE="Installing bundles in default environment"
INSTALL_CMD_ARGS=()

if [ -n "$1" ]; then
    INSTALL_CMD_ARGS+=("--env=$1")
    MESSAGE="Installing bundles in environment $1"
fi

echo "$MESSAGE"

BUNDLES="$(
  bin/console pimcore:bundle:list --json "${INSTALL_CMD_ARGS[@]}" \
    | jq --raw-output '
      [
        .[]
        | select(
          .Enabled == true
          and .Installed == false
          and .Installable == true
        )
        | .Bundle
      ]
      | join(" ")
    '
)"

#Check if bundles need to installed
if [ -z "${BUNDLES}" ]; then
    echo "No bundles to install"
    exit;
fi

# Check if bundles need to installed
if [ -z "${BUNDLES}" ]; then
    echo "No bundles to install"
    exit;
fi

# Install Pimcore bundles
for BUNDLE in ${BUNDLES}; do
  bin/console pimcore:bundle:install "${BUNDLE}" --no-interaction --no-post-change-commands "${INSTALL_CMD_ARGS[@]}"
done
