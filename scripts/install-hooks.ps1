# HandPiano Kids SDD hook installer adapted from dbv-specs-ops v2.9.0.
$ErrorActionPreference = 'Stop'

$repositoryRoot = Split-Path -Parent $PSScriptRoot
git -C $repositoryRoot config --local core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) {
    throw 'Could not configure the repository-local Git hooks path.'
}

Write-Output 'Repository-local pre-commit hook enabled (.githooks).'
