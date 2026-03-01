import bun from "bun"
import { Path, RelativePathLoader } from "./FileSystem";

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

const rpl = RelativePathLoader.ofCurrentDirectory(import.meta);

const comMojang = Path.absolute("C:\\Users\\wakab\\AppData\\Roaming\\Minecraft Bedrock\\Users\\Shared\\games\\com.mojang");
const destB = comMojang.chain("development_behavior_packs/trablo_b");
const destR = comMojang.chain("development_resource_packs/trablo_r");

const fromB = rpl.relative("trablo_b").toFile();
const fromR = rpl.relative("trablo_r").toFile();

destB.toFile().delete();
destR.toFile().delete();

fromB.copyTo(destB);
fromR.copyTo(destR);

console.log("build finished: " + (output.success ? "successful" : "failure"));

console.log(rpl.relative("bun.lock").toFile().toTextFile().read("utf-8"));