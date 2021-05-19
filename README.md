# bm71-decoder

BM71 Bluetooth Low Energy command decoder

## VSCode

launch.json:

``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(lldb) Launch",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/c-parser/main",
      "args": [],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}/c-parser",
      "environment": [],
      "externalConsole": false,
      "MIMode": "lldb",
      "preLaunchTask": "make all"
    },
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "args": [
        "--runInBand",
        "--coverage=false"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest"
    }
  ]
}
```

settings.json:

``` json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "files.autoSave": "off",
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "build": true
  },
  "git.ignoreLimitWarning": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "c-cpp-flylint.flexelint.enable": false
}
```

tasks.json:

``` json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "build:js",
      "group": "build",
      "problemMatcher": []
    },
    {
      "label": "make all",
      "type": "shell",
      "command": "make",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "options": {
        "cwd": "${workspaceFolder}/c-parser"
      },
    }
  ]
}
```