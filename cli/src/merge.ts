import {checkWorkingTree} from "@lerna/check-working-tree";
import exec from "execa";

function throwIfMaster(branchName: string) {
    if (branchName === "master") {
        throw new Error("Cannot merge master to master");
    }
}

export default async function merge(branch?: string) {
    await checkWorkingTree();

    let actualBranch;
    if(branch) {
        throwIfMaster(branch);
        await exec("git", ["checkout", branch], {stdio: "inherit"});
        actualBranch = branch;
    } else {
        const {stdout} = await exec("git", ["branch", "--show-current"]);
        actualBranch = stdout.trim();
    }
    throwIfMaster(actualBranch);

    console.log(`Will merge branch ${actualBranch} to master`);

    await exec("yarn", ["verify"], {stdio: "inherit"});
    await checkWorkingTree();

    await exec("git", ["checkout", "master"], {stdio: "inherit"});
    await exec("git", ["merge", "--ff-only", actualBranch], {stdio: "inherit"});
    await exec("yarn", ["xor", "version-packages"], {stdio: "inherit"});
}
