import fs, { WriteFileOptions } from "node:fs";
import path from "node:path";

export class RelativePathLoader {
    private readonly root: Path;

    private constructor(root: Path) {
        if (!new File(root).isDirectory()) {
            throw new Error();
        }

        this.root = root;
    }

    public relative(string: string): Path {
        return this.root.chain(string);
    }

    public static ofCurrentDirectory(importMeta: ImportMeta): RelativePathLoader {
        return new RelativePathLoader(Path.absolute(importMeta.dir));
    }
}

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

    public toFile(): File {
        return new File(this);
    }

    public toString(): string {
        return this.path;
    }

    public static absolute(string: string): Path {
        return new Path(string);
    }

    public static readonly SEPARATOR_CHAR: string = '\\';
}

export class File {
    protected readonly path: Path;

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

    public delete() {
        if (this.exists()) {
            fs.rmSync(this.path.toString(), {
                recursive: true,
                force: true
            });
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

    public toTextFile(): TextFile {
        return new TextFile(this.path);
    }
}

class TextFile extends File {
    public constructor(path: Path) {
        super(path);
    }

    public read(encoding: BufferEncoding): string[] {
        return fs.readFileSync(this.path.toString(), { encoding }).split('\n');
    }

    public write(contents: string[], options: WriteFileOptions) {
        fs.writeFileSync(this.path.toString(), contents.join('\n'), options);
    }
}
