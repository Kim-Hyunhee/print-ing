import { Response } from "express";
import "reflect-metadata";
import UserService from "../../service/user";
import StatisticsService from "../../service/statistics";

export const getUsers = async () => {
  UserService.getUsers;
};

export const getUser = async () => {
  UserService.getUser;
};

export const getStatistics = async () => {
  StatisticsService.getStatistics;
};
