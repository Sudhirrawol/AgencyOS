import { Router } from "express";
import createClient, {
  getClients,
  getClientId,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";

const router = Router();

router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClientId);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
