# create-release-action

<a href="https://github.com/yseto/create-release-action/actions"><img alt="javscript-action status" src="https://github.com/yseto/create-release-action/workflows/units-test/badge.svg"></a>

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
uses: yseto/create-release-action@main
with:
  directory: artifacts/
  github-token: ${{ secrets.GITHUB_TOKEN }}
  tag-prefix: 'refs/tags/v'
  bump-up-branch-prefix: 'bump-version-'
```

