const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");


const outDir = path.resolve(__dirname, "../src/types");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const protocCmd = [
    // Путь к бинарному файлу protoc
    `"${path.resolve(__dirname, "../node_modules/.bin/grpc_tools_node_protoc.cmd")}"`,

    // Путь к плагину grpc-web
    `--plugin=protoc-gen-grpc-web="${path.resolve(__dirname, "../node_modules/.bin/protoc-gen-grpc-web.cmd")}"`,

    // Путь для подключения proto-файлов
    `-I "${path.resolve(__dirname, "../proto")}"`,

    // Настройки вывода JS
    `--js_out="import_style=commonjs,binary:${outDir}"`,

    // Настройки вывода gRPC-web
    `--grpc-web_out="import_style=typescript,mode=grpcwebtext:${outDir}"`,

    // Путь к proto-файлу
    `"${path.resolve(__dirname, "../proto/stock.proto")}"`
].join(" ");


try {
    console.log(`Очищаем директорию: ${outDir}`);
    if (fs.existsSync(outDir)) {
        fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
    }
    
    console.log("Выполняем команду...");
    console.log(protocCmd);
    execSync(protocCmd, { stdio: 'inherit' });

    const generatedFiles = fs.readdirSync(outDir);
    if (generatedFiles.length > 0) {
        console.log("Генерация файлов прошла успешно:");
        console.log(generatedFiles.join("\n"));
    } else {
        throw new Error("Файлы не сгенерированы.");
    }

} catch (error) {
    console.error("Ошибка генерации файлов:", error);
    process.exit(1);
}
