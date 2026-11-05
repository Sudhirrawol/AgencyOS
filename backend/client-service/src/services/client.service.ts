import UserClient from "../models/client.model.js";

type ClientData = {
  name: string;
  email: string;
  company: string;
  phone?: string;
};

export async function getAllClients() {
  return await UserClient.find({});
}

export async function createNewClient(data: ClientData) {
  return await UserClient.create(data);
}

export async function getClientById(id: string) {
  return UserClient.findById(id);
}

export async function updateClientId(id: string, data: Partial<ClientData>) {
  return UserClient.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteClientById(id: string) {
  return UserClient.findByIdAndDelete(id);
}
