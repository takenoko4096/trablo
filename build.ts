import bun from "bun"
import { File, Path } from "./FileSystem";

console.log("build start");

const output = await bun.build({
    entrypoints: [
        "./src/index.ts"
    ],
    outdir: "trablo_b/scripts",
    target: "node",
    format: "esm",
    external: [
        "@minecraft/server",
        "@minecraft/server-ui",
        "@minecraft/server-graphics",
        "@minecraft/server-gametest",
        "@minecraft/server-net",
        "@minecraft/server-admin",
        "@minecraft/server-editor",
        "@minecraft/debug-utilities",
        "@minecraft/diagnostics",
        "@minecraft/common"
    ],
    minify: true
});

const comMojang = Path.parseAbsolute("C:\\Users\\wakab\\AppData\\Roaming\\Minecraft Bedrock\\Users\\Shared\\games\\com.mojang");
const devB = comMojang.chain("development_behavior_packs/trablo_b");
const devR = comMojang.chain("development_resource_packs/trablo_r");

const fromB = new File(Path.parseAbsolute(__dirname + "/trablo_b"));
const fromR = new File(Path.parseAbsolute(__dirname + "/trablo_r"));

fromB.copyTo(devB);
fromR.copyTo(devR);

console.log("build finished: " + (output.success ? "successful" : "failure"));
