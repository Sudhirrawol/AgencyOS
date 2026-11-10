import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "agencyos-admin",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin(); //topic create delete aur manage karna

async function createTopics() {
  await admin.connect();
  console.log("Kafka connected succesfully");
  await admin.createTopics({
    topics: [
      {
        topic: "project.events",
        numPartitions: 3,
        replicationFactor: 1,
      },
    ],
  });
  await admin.disconnect();
}
createTopics();

// docker compose -f ..\docker-compose.yml up -d

console.log("Topic created succesfully");
