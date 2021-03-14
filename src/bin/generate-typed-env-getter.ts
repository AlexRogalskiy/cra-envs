#!/usr/bin/env node

import { join as pathJoin, basename as pathBasename } from "path";
import { getEnvNames } from "./getEnvNames";
import * as fs from "fs";
import { getProjectRoot } from "../tools/getProjectRoot";

const targetProjectDirPath = process.cwd();

const doUseJs = process.argv[2]?.toLowerCase() === "js";

const thisModuleName = require(pathJoin(getProjectRoot(), "package.json"))["name"];
const thisScriptName = pathBasename(__filename).split(".")[0];

fs.writeFileSync(
    pathJoin(targetProjectDirPath, "src", `env.${doUseJs ? "js" : "ts"}`),
    Buffer.from(
        [
            '/* ',
            `* Automatically generated by ${thisModuleName}.`,
            '* If you wish to declare a new environment variable declare it in the .env file (prefixed by REACT_APP_)',
            `* then run 'npx ${thisScriptName}${doUseJs ? " js" : ""}' at the root of your project.`,
            '* This file will be updated.',
            '*/',
            `import { getEnvVarValue } from "${thisModuleName}";`,
            '',
            'export function getEnv() {',
            '    return {',
            getEnvNames({ targetProjectDirPath })
                .map(envName => `        "${envName}": getEnvVarValue("${envName}")`)
                .join(",\n"),
            `    }${doUseJs ? "" : " as const"};`,
            '}',
            ''
        ].join("\n"),
        "utf8"
    )
);






