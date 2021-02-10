# create-release-action

<a href="https://github.com/mackerelio/create-release-action/actions"><img alt="javscript-action status" src="https://github.com/mackerelio/create-release-action/workflows/units-test/badge.svg"></a>

This repository is used for this organization's release flow and is subject to change without notice.

## Code in Main

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test
...
```

## Usage

```yaml
uses: mackerelio/create-release-action@main
with:
  directory: artifacts/
  github-token: ${{ secrets.GITHUB_TOKEN }}
  tag-prefix: 'refs/tags/v'
  bump-up-branch-prefix: 'bump-version-'
```

