import { Request, Response, NextFunction } from "express";

export const validateEvent = (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    from_date,
    from_time,
    to_date,
    to_time,
    venue,
    location,
    category,
    price,
    organizer_id,
  } = req.body;

  if (
    !title ||
    !description ||
    !from_date ||
    !from_time ||
    !to_date ||
    !to_time ||
    !venue ||
    !location ||
    !category ||
    price === undefined ||
    organizer_id === undefined
  ) {
    console.log("Validation Failed:", req.body);
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  next();
};
