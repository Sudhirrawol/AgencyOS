import UserClient from "../models/client.model.js";
import type { Request, Response } from "express";
import createClientSchema, {
  updateClientSchema,
} from "../validators/client.validators.js";
import z from "zod";
import mongoose from "mongoose";

async function createClient(req: Request, res: Response) {
  try {
    const result = createClientSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: z.treeifyError(result.error),
      });
    }
    const { name, email, phone, company } = result.data;
    const userDetails = await UserClient.create({
      name,
      email,
      phone,
      company,
    });
    return res.status(201).json({
      message: "user create succesfully",
      userDetails: userDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create client",
    });
  }
}

export async function getClients(req: Request, res: Response) {
  try {
    const userDetails = await UserClient.find({});
    res.status(200).json({
      message: "Clients fetched successfully",
      userDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch clients",
    });
  }
}

export async function getClientId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid client ID",
      });
    }
    const user = await UserClient.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Client does not exist" });
    }
    res.status(200).json({
      message: "user deatils fetched",
      userDetails: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch client" });
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid client ID",
      });
    }
    const result = updateClientSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: z.treeifyError(result.error),
      });
    }
    const updatedClient = await UserClient.findByIdAndUpdate(id, result.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return res.status(404).json({
        message: "Client not found",
      });
    }
    return res.status(200).json({
      message: "Client updated successfully",
      userDetails: updatedClient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update the client",
    });
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid client ID",
      });
    }
    const deletedClient = await UserClient.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({
        message: "Client not found",
      });
    }
    return res.status(200).json({
      message: "Client deleted successfully",
      deleteClient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete client",
    });
  }
}
export default createClient;
