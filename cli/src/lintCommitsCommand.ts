import lintCommits from "./lintCommits";

export default {
    command: "lint-commits",
    describe: "Lints commits from last version according to conventional commits guidelines",
    handler: async function handler() {
        await lintCommits();
    }
};
