import { system, world } from "@minecraft/server";

const OBJECTIVE = "trablo:variant";

await system.waitTicks(1);

if (world.scoreboard.getObjective(OBJECTIVE) === undefined) {
    world.scoreboard.addObjective(OBJECTIVE);
}

console.log("Script from addon 'trablo' has been successfully loaded.");

// minecraft:entity_spawned は上書きされうる
world.afterEvents.entitySpawn.subscribe(event => {
    event.entity.triggerEvent("trablo:toggle_ai");
});
