import {checkWorkingTree} from "@lerna/check-working-tree";
import exec from "execa";

export default async function versionPackages() {
    await checkWorkingTree();

    const args = [
        "version",
        "--conventional-commits",
        "--conventional-graduate",
        "--message",
        "chore: update versions",
        "--yes",
        "--no-push"
    ];
    await exec("lerna", args, {stdio: "inherit"});

}
