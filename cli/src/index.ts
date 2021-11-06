import yargs from "yargs";
import lintCommitsCommand from "./lintCommitsCommand";
import versionPackagesCommand from "./versionPackagesCommand";
import mergeCommand from "./mergeCommand";

yargs
    .strict()
    .demandCommand()
    .command(lintCommitsCommand)
    .command(versionPackagesCommand)
    .command(mergeCommand)
    .parse();
