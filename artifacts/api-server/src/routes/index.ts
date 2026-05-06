import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import openaiConversationsRouter from "./openai/conversations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use("/openai", openaiConversationsRouter);

export default router;
