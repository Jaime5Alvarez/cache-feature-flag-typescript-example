import { config } from "dotenv";

config();

export const POSTHOG_API_KEY =
	process.env.POSTHOG_API_KEY ||
	"phc_reIo8JQxmy8F7xVc2CZOhwc7vItRDgWi1nQZdWDTuR7";

if (!POSTHOG_API_KEY) {
	throw new Error("POSTHOG_API_KEY is not set");
}

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT || "6379");
export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
