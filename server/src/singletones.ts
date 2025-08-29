import PrismaImagesImpl from "dbImplementations/PrismaImagesImpl.js";
import PrismaSuperheroImpl from "dbImplementations/PrismaSuperheroImpl.js";
import { HeroImageCloudService } from "Services/HeroImagesServices/HeroImageCloudService.js";
import { HeroImageDbService } from "Services/HeroImagesServices/HeroImageDbService.js";
import { GenericDbService } from "Services/Shared/GenericDbService.js";
import { AwsImplementation } from "storageImplementations/AwsImplementation.js";
import { Superhero } from "../../shared/interfaces/SuperHero.js";

export const prismImgImpl = new PrismaImagesImpl();
export const prismSuperheroImpl = new PrismaSuperheroImpl();
export const awsImplementation = new AwsImplementation();

export const imgCloudService = new HeroImageCloudService(awsImplementation);
export const imgDbService = new HeroImageDbService(prismImgImpl);
export const superheroDbService = new GenericDbService<Superhero>(prismSuperheroImpl)