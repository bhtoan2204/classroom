/// <reference types="multer" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { BlockBlobClient } from '@azure/storage-blob';
export declare class StorageService {
    private readonly configService;
    constructor(configService: ConfigService);
    getBlockBlobClient(filename: string): BlockBlobClient;
    private generateRandomFilename;
    uploadImage(filename: Express.Multer.File): Promise<string>;
    uploadCsv(filename: Express.Multer.File, classId: string): Promise<string>;
    exportToCsvAndUpload(data: any[], filename: string): Promise<string>;
    readStream(filename: string): Promise<NodeJS.ReadableStream>;
}
