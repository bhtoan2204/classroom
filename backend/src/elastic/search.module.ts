import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const isProduction = configService.get<string>('NODE_ENV') === 'production';
                if (isProduction) {
                    return {
                        cloud: {
                            id: configService.get<string>('ELASTICSEARCH_NODE'),
                        },
                        auth: {
                            username: configService.get<string>('ELASTICSEARCH_USERNAME'),
                            password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
                        },
                    };
                } else {
                    return {
                        node: configService.get<string>('ELASTICSEARCH_NODE'),
                        auth: {
                            username: configService.get<string>('ELASTICSEARCH_USERNAME'),
                            password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
                        },
                    };
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [SearchService],
    exports: [ElasticsearchModule, SearchService],
})
export class SearchModule { }
