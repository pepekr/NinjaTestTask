import { HeroImage } from "./HeroImage";

// no need for any dtos no confidential or unneccessary info 
export interface Superhero {
    id: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
}

export interface SuperheroCreational
{
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
}