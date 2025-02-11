import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): void {

    const SECRET_KEY = process.env.JWT_SECRET!;
    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }

    const authHeader = req.headers.authorization;

    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        res.status(401).json({ message: "Access Denied. Token missing or incorrect format" });
        return;
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded token:", decoded);

        req.headers.payload = JSON.stringify(decoded);

        next();
    } catch (error: any) {
        console.error("JWT verification failed:", error.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
}
