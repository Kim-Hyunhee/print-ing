import { Request, Response } from "express";
import "reflect-metadata";
import BankService from "../service/bank";

export const postBankName = async () => {
  BankService.createBank;
};

export const getBanks = async (req: Request, res: Response) => {
  const banks = await BankService.getBanks();

  return res.send(banks);
};

export const putBanks = async () => {
  BankService.putBanks;
};

export const deleteBanks = async () => {
  BankService.deleteBanks;
};
