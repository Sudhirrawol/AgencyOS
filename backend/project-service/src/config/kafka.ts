import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "agencyos-project-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer = kafka.producer();
