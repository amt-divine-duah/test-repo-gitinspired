#!/usr/bin/env node
import * as yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
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
