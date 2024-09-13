import { Response } from "express";
import "reflect-metadata";
import AdminAccountService from "../service/adminAccount";

export const postAdminAccount = async () => {
  AdminAccountService.createAdminAccount;
};

export const putAdminAccount = async () => {
  AdminAccountService.putAdminAccount;
};

export const getAdminAccounts = async () => {
  AdminAccountService.getAdminAccount;
};

export const deleteAdminAccounts = async () => {
  AdminAccountService.deleteAdminAccounts;
};
