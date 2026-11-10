import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "agencyos-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function publishProjectCreated(projectId: string) {
  await producer.send({
    topic: "project.events",
    messages: [
      {
        key: projectId,
        value: JSON.stringify({
          eventType: "project.created",
          projectId: projectId,
        }),
      },
    ],
  });
}
async function sendEvent() {
  await producer.connect();
  console.log("Producer connected succesfully");
  publishProjectCreated("project-101");
  await publishProjectCreated("project-101");
  await producer.disconnect();
}

sendEvent();
