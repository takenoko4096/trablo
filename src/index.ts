import { system, world } from "@minecraft/server";

const OBJECTIVE = "trablo:variant";

await system.waitTicks(1);

if (world.scoreboard.getObjective(OBJECTIVE) === undefined) {
    world.scoreboard.addObjective(OBJECTIVE);
}

console.log("Script from addon 'trablo' has been successfully loaded.");
