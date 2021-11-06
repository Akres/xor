import yargs from "yargs";
import lintCommitsCommand from "./lintCommitsCommand";

yargs
    .strict()
    .demandCommand()
    .command(lintCommitsCommand)
    .parse();
