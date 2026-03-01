import fs from "node:fs";
import path from "node:path";

export class Path {
    private readonly path: string;

    private readonly parsed: path.ParsedPath;

    private constructor(string: string) {
        this.parsed = path.parse(string.replaceAll('/', Path.SEPARATOR_CHAR));
        this.path = this.parsed.dir + Path.SEPARATOR_CHAR + this.parsed.base;
    }

    public fileName(): string {
        return this.parsed.base;
    }

    public nameOnly(): string {
        return this.parsed.name;
    }

    public extentionOnly(): string {
        return this.parsed.ext.slice(1);
    }

    public chain(...strings: string[]): Path {
        return new Path(path.join(this.toString(), ...strings));
    }

    public toString(): string {
        return this.path;
    }

    public isAbsolute(): boolean {
        return path.isAbsolute(this.toString());
    }

    public static parseAbsolute(string: string): Path {
        return new Path(string);
    }

    public static readonly SEPARATOR_CHAR: string = '\\';
}

export class File {
    private readonly path: Path;

    public constructor(path: Path) {
        this.path = path;
    }

    public exists(): boolean {
        return fs.existsSync(this.path.toString());
    }

    public isFile(): boolean {
        if (!this.exists()) {
            throw new Error();
        }

        const stat = fs.statSync(this.path.toString());
        return stat.isFile();
    }

    public isDirectory() {
        return !this.isFile();
    }

    public create() {
        if (!this.exists()) {
            fs.writeFileSync(this.path.toString(), '', "utf-8");
        }
    }

    public readLinesUTF8(): string[] {
        return fs.readFileSync(this.path.toString(), { encoding: "utf-8" }).split("\r\n");
    }

    public delete() {
        if (this.exists()) {
            fs.rmSync(this.path.toString());
        }
    }

    public copyTo(destination: Path) {
        if (!this.exists()) {
            throw new Error();
        }

        if (this.isFile()) {
            fs.copyFileSync(this.path.toString(), destination.toString());
        }
        else {
            fs.mkdirSync(destination.toString(), {
                recursive: true
            });

            const files = fs.readdirSync(this.path.toString(), {
                withFileTypes: true
            });

            for (const file of files) {
                const childSourceFile = new File(this.path.chain(file.name));
                const childDestinationPath = destination.chain(file.name);
                childSourceFile.copyTo(childDestinationPath);
            }
        }
    }
}
