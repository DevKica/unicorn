import { Router } from "express";
import { createLikeHandler } from "../../controllers/likes.controllers";

const likesMainRoutes = Router();

// create like

likesMainRoutes.post("/", createLikeHandler);
