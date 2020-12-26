import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeesModule,
    // secure in future
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres' as const, // type of our database
            autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
            synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
            url: process.env.DATABASE_URL,
          }
        : {
            type: 'postgres' as const, // type of our database
            host: 'localhost', // database host
            port: 5432, // database port
            username: 'postgres', // username
            password: 'pass123', // user password
            database: 'postgres', // name of our database,
            autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
            synchronize: false, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
          },
    ),
    DatabaseModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
