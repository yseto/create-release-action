# m-g-r

<a href="https://github.com/yseto/m-g-r/actions"><img alt="javscript-action status" src="https://github.com/yseto/m-g-r/workflows/units-test/badge.svg"></a>

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
uses: yseto/m-g-r
with:
  directory: artifacts/
  github-token: ${{ secrets.GITHUB_TOKEN }}
  tag-prefix: 'refs/tags/v'
  bump-up-branch-prefix: 'bump-version-'
```

