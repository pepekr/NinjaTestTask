-- CreateTable
CREATE TABLE "public"."SuperHero" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,

    CONSTRAINT "SuperHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "imageOwnerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_imageOwnerId_fkey" FOREIGN KEY ("imageOwnerId") REFERENCES "public"."SuperHero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
