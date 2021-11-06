import {describeRef} from "@lerna/describe-ref";
import exec from "execa";

interface CommitRange {
    from: string;
    to: string;
}

async function rangeFromLerna(): Promise<CommitRange> {
    console.log("Resolving commit range using lerna.");

    const {lastTagName, sha} = await describeRef();

    return {
        // Fall back to the current commit hash if lerna did not find a previous release
        from: lastTagName || sha,
        to: sha
    };
}



async function lint({from, to}: CommitRange) {
    const args = ["-f", from, "-t", to];

    await exec("commitlint", args, {
        stdio: "inherit"
    });
}


export default async function lintCommits() {
    const range = await rangeFromLerna();
    await lint(range);
}
