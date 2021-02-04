const core = require('@actions/core');
const github = require('@actions/github');
const read = require('fs-readdir-recursive');

async function readPR (octokit, context, bumpUpBranchPrefix, version) {
  const { repo: { owner, repo } } = context;

  const prs = await octokit.pulls.list({
    owner,
    repo,
    state: "closed",
    head: `${owner}:${bumpUpBranchPrefix}${version}`,
  });

  const pr = prs.data.filter(x => !!x.merged_at);
  if (pr.length == 1) {
    return pr[0].body;
  }

  return "";
}

async function run() {
  try {
    const fs = require('fs').promises;
    const path = require('path');

    const token = core.getInput('github-token');
    const directory = core.getInput('directory');
    const tagPrefix = core.getInput('tag-prefix');
    const bumpUpBranchPrefix = core.getInput('bump-up-branch-prefix');

    const octokit = github.getOctokit(token);

    const context = github.context;
    const { repo: { owner, repo }, ref } = context;

    const tag = ref.replace('refs/tags/', '');

    const release = await octokit.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    const version = ref.replace(tagPrefix, '');
    const prText = await readPR(octokit, context, bumpUpBranchPrefix, version);

    const artifacts = read('.', () => true, [], directory);

    core.startGroup('Assets')
    for (let file of artifacts) {
      core.info('uploading ' + file);

      await octokit.repos.uploadReleaseAsset({
        owner, repo,
        release_id: release.data.id,
        name: path.basename(file),
        data: await fs.readFile(file),
      });
    }
    core.endGroup()

    await octokit.repos.updateRelease({
      owner,
      repo,
      release_id: release.data.id,
      prerelease: false,
      name: tag,
      body: prText,
    });

    core.info("\u001b[1mRelease: " + release.data.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
