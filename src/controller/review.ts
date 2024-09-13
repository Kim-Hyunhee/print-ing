import { Response } from "express";
import "reflect-metadata";
import ReviewService from "../service/review";

export const postReview = async () => {
  ReviewService.createReview;
};

export const putReview = async () => {
  ReviewService.putReview;
};

export const deleteReview = async () => {
  ReviewService.deleteReview;
};

export const getReviews = async () => {
  ReviewService.getReviews;
};

export const getReview = async () => {
  ReviewService.getReview;
};

export const patchReviewStatus = async () => {
  ReviewService.patchReviewStatus;
};
