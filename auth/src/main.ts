import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {GlobalExceptionFilter} from "@/infrastructure/exceptions/exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Auth API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
            displayRequestDuration: true,
            docExpansion: 'list',
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            tryItOutEnabled: true,
        },
        customSiteTitle: 'Fast Food Auth API Docs'
    });

    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.listen(3030);
}

bootstrap();