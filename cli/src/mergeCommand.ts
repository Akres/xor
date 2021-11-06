import {Argv} from "yargs";
import merge from "./merge";

function builder(yargs: Argv) {
    return yargs
        .option("branch", {
            alias: "-b",
            describe: "Branch to merge into master",
            demandOption: false,
            type: "string"
        });
}

async function handler({branch}: {branch: string | undefined}) {
    await merge(branch);
}

export default {
    command: "merge",
    description: "Used to perform checks and merge branch",
    builder,
    handler
};
