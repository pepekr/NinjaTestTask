export interface HeroImage {
  id: string;
  imageOwnerId: string;
  url: string;
}

export interface HeroImageCreational {
  imageOwnerId: string;
  buffer: Buffer<ArrayBufferLike>;
  fileName:string
}

export interface HeroImageWithBuffer {
  key: string;
  id: string;
  imageOwnerId: string;
  buffer: Buffer<ArrayBufferLike>;
}

