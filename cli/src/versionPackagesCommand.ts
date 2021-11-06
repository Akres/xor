import versionPackages from "./versionPackages";

export default {
    command: "version-packages",
    description: "Creates a versioning commit using lerna to determine which packages have changed",
    handler: async function handler() {
        await versionPackages();
    }
};
