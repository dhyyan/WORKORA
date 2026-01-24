import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../domain/entities/httpStatus";
import { clientRepository } from "../../frameWork/DI/clientInject";
import { freelancerRepository } from "../../frameWork/DI/freelancerInject";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user;
console.log("2n midlldde",userId)
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized access" });
    }
    console.log("middelel",userId.userId)
    
    const client = await clientRepository.findById(userId.userId);
     console.log("clinetmiddelel",client)
    if (client) {
      if (client.isBlocked) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "user is blocked by admin" });
      }
      console.log("sdsdf success")
      return next();
    }

    
    const freelancer = await freelancerRepository.findById(userId.userId);
     console.log("freeemiddelel",freelancer)
    if (freelancer) {
      if (freelancer.isBlocked) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "user is blocked by admin" });
      }
      console.log("dfgdfg success")
      return next();
    }

    
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "User not found" });

  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: "Authentication failed",
      error: error instanceof Error ? error.message : "Invalid token"
    });
  }
};
