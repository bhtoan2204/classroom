"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const storage_blob_1 = require("@azure/storage-blob");
const crypto = require("crypto");
const fastCsv = require("fast-csv");
const fs_1 = require("fs");
let StorageService = class StorageService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getBlockBlobClient(filename) {
        const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(this.configService.get('AZURE_STORAGE_CONNECTION'));
        const blobContainer = blobServiceClient.getContainerClient(this.configService.get('AZURE_STORAGE_CONTAINER'));
        return blobContainer.getBlockBlobClient(filename);
    }
    generateRandomFilename(originalname) {
        const timestamp = new Date().getTime();
        const randomString = crypto.randomBytes(8).toString('hex');
        const uniqueFilename = `${timestamp}_${randomString}_${originalname}`;
        return uniqueFilename;
    }
    async uploadImage(filename) {
        const uniqueFilename = this.generateRandomFilename(filename.originalname);
        const blobBlobClient = this.getBlockBlobClient(uniqueFilename);
        await blobBlobClient.uploadData(filename.buffer);
        return uniqueFilename;
    }
    async uploadCsv(filename, classId) {
        const curDate = new Date().toISOString().slice(0, 10);
        const uniqueFilename = classId + curDate + filename.originalname;
        const blobBlobClient = this.getBlockBlobClient(uniqueFilename);
        await blobBlobClient.uploadData(filename.buffer);
        return uniqueFilename;
    }
    async exportToCsvAndUpload(data, filename) {
        const csvData = data.map((item) => ({ StudentID: item.StudentID, Fullname: item.Fullname }));
        const csvFilePath = `./${filename}.csv`;
        await new Promise((resolve, reject) => {
            const csvStream = fastCsv.writeToPath(csvFilePath, csvData, { headers: true });
            csvStream.on('finish', () => resolve(csvStream));
            csvStream.on('error', (error) => reject(error));
        });
        const uniqueFilename = this.generateRandomFilename(`${filename}.csv`);
        const blobBlobClient = this.getBlockBlobClient(uniqueFilename);
        await blobBlobClient.uploadFile(csvFilePath);
        (0, fs_1.createReadStream)(csvFilePath).pipe((0, fs_1.createWriteStream)('/dev/null'));
        return uniqueFilename;
    }
    async readStream(filename) {
        const blobBlobClient = this.getBlockBlobClient(filename);
        const downloadBlockBlobResponse = await blobBlobClient.download(0);
        return downloadBlockBlobResponse.readableStreamBody;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map