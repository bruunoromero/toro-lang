module.exports = {
  hooks: {
    "commit-msg": "commitlint -e",
    "pre-commit": "cross-env npm run lint && npm run test",
  },
};
