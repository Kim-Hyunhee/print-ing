import { Response } from "express";
import "reflect-metadata";
import HomepageService from "../service/homepage";

export const postHomepage = async () => {
  HomepageService.createHomepage;
};

export const putHomepage = async () => {
  HomepageService.putHomepage;
};

export const getHomepage = async () => {
  HomepageService.getHomepage;
};
