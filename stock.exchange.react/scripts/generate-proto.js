const { execSync } = require("child_process");
const path = require("path")

const PROTO_PATH = path.join(__dirname, "../proto/stock.proto");
const OUT_DIR = path.join(__dirname, "../src/types");

console.log(__dirname);

const command = `
protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out=import_style=commonjs,binary:${OUT_DIR} \
    --ts-out=service=grpc-web:${OUT_DIR} \
    -I ../proto 
    ${PROTO_PATH}
`

try{
    execSync(command, {stdio:'inherit'});
    console.log("Gen success!");
}catch(error){
    console.log("Gen error!", error);
}