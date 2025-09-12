import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

class RedisSingleton {
    constructor() {
        if (!RedisSingleton.instance) {
            const redisUrl = process.env.REDIS_URL;
            if (!redisUrl) {
                throw new Error("REDIS_URL is not set");
            }

            this.client = new Redis(redisUrl);

            // Manejo de eventos para errores y conexión
            this.client.on("error", (err) => {
                console.error("❌ Redis connection error:", err);
            });

            this.client.on("connect", () => {
                console.log("✅ Connected to Redis");
            });

            RedisSingleton.instance = this;
        }
        console.log("Ya conectado a redis")
        return RedisSingleton.instance;
    }

    getClient() {
        return this.client;
    }
}

// Evita múltiples instancias en desarrollo (útil en Next.js y nodemon)
const redisInstance = global.redisInstance || new RedisSingleton().getClient();

if (process.env.NODE_ENV !== "production") {
    global.redisInstance = redisInstance;
}

export { redisInstance as redis };