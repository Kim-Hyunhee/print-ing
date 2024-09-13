import { Response } from "express";
import "reflect-metadata";
import NotificationService from "../service/notification";

export const postNotification = async () => {
  NotificationService.createNotification;
};

export const putNotice = async () => {
  NotificationService.putNotification;
};

export const deleteNotice = async () => {
  NotificationService.deleteNotification;
};

export const getNotifications = async () => {
  NotificationService.getNotifications;
};

export const getNotification = async () => {
  NotificationService.getNotification;
};
