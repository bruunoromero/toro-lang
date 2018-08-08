module.exports = {
  hooks: {
    "pre-push": "npm run test",
    "pre-commit": "npm run lint",
    "commit-msg": "commitlint -e",
  },
};
