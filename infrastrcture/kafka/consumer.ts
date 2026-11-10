import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "agencyos-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "notification-service",
});

async function consumeEvents() {
  await consumer.connect();
  console.log("Consumer connected succesfully");
  await consumer.subscribe({
    topic: "project.events",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
}

consumeEvents();
