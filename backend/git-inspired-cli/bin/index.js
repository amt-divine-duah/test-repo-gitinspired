#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const helpers_1 = require("yargs/helpers");
yargs((0, helpers_1.hideBin)(process.argv))
    .scriptName("subsys")
    .version("1.1.0")
    .usage("Usage: subsys <command> [options]")
    .commandDir("commands")
    .demandCommand(1, "Please specify a command.")
    .recommendCommands()
    .strict()
    .showHelpOnFail(true)
    .help()
    .option("h", {
    alias: "help",
    describe: "Show help for the specified command",
}).argv;
//# sourceMappingURL=index.js.map