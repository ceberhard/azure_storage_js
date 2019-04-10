const azstore = require('azure-storage');

require('dotenv').config();

const bst = azstore.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
const CONTAINER = 'demo';

start();

async function start() {
    await createContainer(CONTAINER);
    console.log(`Created Container: "${CONTAINER}"`);

    await write('chrisblob1', 'hello world!');
    console.log('Write blob value');

    // let value = 
}

async function createContainer(containername) {
    return new Promise(r => {
        bst.createContainerIfNotExists(containername, () => r());
    })
}

async function write(name, text) {
    return new Promise((resolve, reject) => {
        bst.createBlockBlobFromText(CONTAINER, name, text, (err) => {
            if (!err) resolve();
            else reject();
        })
    })
}

async function read(name) {
    return Promise(r => {
        bst.getBlobToText(CONTAINER, name, (err, text) => r(err ? null : text));
    })
}

