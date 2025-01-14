import { downloadAndUnzip } from "../tools/downloadAndUnzip";
import * as st from "scripting-tools";
import { join as pathJoin } from "path";
import { getProjectRoot } from "../tools/getProjectRoot";

const sampleProjectDirPath = pathJoin(getProjectRoot(), "sample_project");

downloadAndUnzip({
    "url": "https://github.com/garronej/cra-envs/releases/download/ASSETS/sample_project.zip",
    "destDirPath": sampleProjectDirPath
});

const bin = require(pathJoin(getProjectRoot(), "package.json"))["bin"];

for (const arg of ["", " js"]) {

    Object.keys(bin).forEach(scriptName =>
        st.execSyncTrace(
            `node ${pathJoin(getProjectRoot(), bin[scriptName])}${arg}`,
            { "cwd": sampleProjectDirPath }
        )
    );

}
