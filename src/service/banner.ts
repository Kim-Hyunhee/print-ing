import "reflect-metadata";
import { Banner } from "../entity";
import { getRepository } from "typeorm";

const BannerService = {
  createBanner: async ({
    position,
    image,
    link,
  }: {
    position: number;
    image: string;
    link: string;
  }) => {
    const banner = new Banner();
    banner.position = position;
    banner.image = image;
    banner.link = link;

    await Banner.save(banner);
  },

  putBanner: async ({
    id,
    position,
    image,
    link,
  }: {
    id: number;
    position?: number;
    image?: string;
    link?: string;
  }) => {
    await getRepository(Banner)
      .createQueryBuilder()
      .update(Banner)
      .set({
        position,
        image,
        link,
      })
      .where("id = :id", { id })
      .execute();
  },

  getBanners: async () => {
    const banners = await getRepository(Banner)
      .createQueryBuilder()
      .orderBy("position", "ASC")
      .getMany();

    return banners;
  },

  deleteBanner: async ({ bannerId }: { bannerId: number }) => {
    await getRepository(Banner)
      .createQueryBuilder()
      .delete()
      .from(Banner)
      .where("id = :bannerId", { bannerId })
      .execute();
  },
};
export default BannerService;
