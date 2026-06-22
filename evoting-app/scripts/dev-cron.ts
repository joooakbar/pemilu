// scripts/dev-cron.ts
import "dotenv/config"; // 🔥 INI WAJIB
import { updateElectionStatus } from "./upadateElectionsStatus";

async function loop() {
  console.log("Cron running...");
  await updateElectionStatus();
  setTimeout(loop, 0.5 * 1000);
}

loop();
