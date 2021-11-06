import yargs from "yargs";
import lintCommitsCommand from "./lintCommitsCommand";
import versionPackagesCommand from "./versionPackagesCommand";

yargs
    .strict()
    .demandCommand()
    .command(lintCommitsCommand)
    .command(versionPackagesCommand)
    .parse();
