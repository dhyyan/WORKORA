import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../domain/entities/httpStatus";
import { jwtService } from "../../frameWork/DI/clientInject";

export const tokenVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("tokkkke",authHeader)

   
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Access denied. No token provided." });
    }

    
    const token = authHeader.split(" ")[1];

   
    const decoded = jwtService.verifyAccessToken(
      token,
      process.env.ACCESS_TOKEN_KEY!
    );

    if (!decoded) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }

    
    (req as any).user = decoded;
console.log("all success")
    next(); 
  } catch (error) {
    return res.status(HttpStatus.FORBIDDEN).json({
      message: "Invalid token",
      error: error instanceof Error ? error.message : "Invalid token"
    });
  }
};
