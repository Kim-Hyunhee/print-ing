import { Response } from "express";
import "reflect-metadata";
import NoticeService from "../service/notice";

export const postNotice = async () => {
  NoticeService.createNotice;
};

export const putNotice = async () => {
  NoticeService.putNotice;
};

export const deleteNotice = async () => {
  NoticeService.deleteNotice;
};

export const getNotices = async () => {
  NoticeService.getNotices;
};

export const getNotice = async () => {
  NoticeService.getNotice;
};
