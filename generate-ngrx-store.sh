#!/bin/bash

# Usage: ./generate-ngrx-store.sh teams-test

set -e

if [ -z "$1" ]; then
  echo "Please provide a store name. Usage: ./generate-ngrx-store.sh <store-name>"
  exit 1
fi

# Input store name (e.g., "teams-test")
STORE_NAME=$1

# Folder name
FOLDER_NAME=$STORE_NAME

# Convert kebab-case to PascalCase (e.g., "teams-test" -> "TeamsTest")
to_pascal_case() {
  IFS='-' read -ra PARTS <<< "$1"
  PASCAL=""
  for PART in "${PARTS[@]}"; do
    FIRST_CHAR=$(echo "${PART:0:1}" | tr '[:lower:]' '[:upper:]')
    REST_CHARS="${PART:1}"
    PASCAL+="${FIRST_CHAR}${REST_CHARS}"
  done
  echo "$PASCAL"
}

# Convert kebab-case to camelCase (e.g., "teams-test" -> "teamstest")
to_camel() {
  echo "$1" | sed 's/-//g'
}

# Convert kebab-case to CONSTANT_CASE (e.g., "teams-test" -> "TEAMS_TEST")
to_constant_case() {
  echo "$1" | tr '[:lower:]-' '[:upper:]_'
}

PASCAL_NAME=$(to_pascal_case "$STORE_NAME")
CAMEL_NAME=$(to_camel "$STORE_NAME")
UPPER_NAME=$(to_constant_case "$STORE_NAME")

# Create subfolders
mkdir -p "$FOLDER_NAME"/{actions,effects,feature,reducers,state}

# Actions
cat > "$FOLDER_NAME/actions/$STORE_NAME.actions.ts" <<EOF
import { createActionGroup } from '@ngrx/store';

export const ${CAMEL_NAME}Actions = createActionGroup({
  source: '$PASCAL_NAME',
  events: {},
});
EOF

# Effects
cat > "$FOLDER_NAME/effects/$STORE_NAME.effects.ts" <<EOF
import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class ${PASCAL_NAME}Effects {
  private readonly actions\$ = inject(Actions);
}
EOF

# Feature
cat > "$FOLDER_NAME/feature/$STORE_NAME.feature.ts" <<EOF
import { createFeature } from '@ngrx/store';
import { ${CAMEL_NAME}Reducer } from '../reducers/$STORE_NAME.reducer';

export const ${CAMEL_NAME}Feature = createFeature({
  name: '$STORE_NAME',
  reducer: ${CAMEL_NAME}Reducer,
})
EOF

# Reducer
cat > "$FOLDER_NAME/reducers/$STORE_NAME.reducer.ts" <<EOF
import { createReducer } from '@ngrx/store';
import { INITIAL_${UPPER_NAME}_STATE } from '../state/$STORE_NAME.initial-state';

export const ${CAMEL_NAME}Reducer = createReducer(INITIAL_${UPPER_NAME}_STATE)
EOF

# State interface
cat > "$FOLDER_NAME/state/$STORE_NAME.state.ts" <<EOF
export interface ${PASCAL_NAME}State {}
EOF

# Initial state
cat > "$FOLDER_NAME/state/$STORE_NAME.initial-state.ts" <<EOF
import { ${PASCAL_NAME}State } from './$STORE_NAME.state';

export const INITIAL_${UPPER_NAME}_STATE: ${PASCAL_NAME}State = {}
EOF

echo "✅ NgRx store scaffold for '$STORE_NAME' generated successfully."
