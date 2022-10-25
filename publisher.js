const amqp = require("amqplib");

const message = {num: process.argv[2]}
connect();
async function connect () {

    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createConfirmChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)))
        console.log(`job sent successfully ${message.num}`);
        await channel.close();
        await connection.close();
    } 
    catch (error) {
        console.log(error);
    }
    
}