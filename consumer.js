import amqp from "amqplib";

connect();
async function connect () {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createConfirmChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.num}`);
            //TODO delete consumer element dynamically
            if(input.num == "99") {
                channel.ack(message);
            }
        })
        console.log("Waiting for messages...")
    } 
    catch (error) {
        console.log(error);
    }
}