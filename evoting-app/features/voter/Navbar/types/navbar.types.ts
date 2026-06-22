import { StatusPemilihan } from "@prisma/client";

export interface NavbarProps {
  idPemilihan?: string;
  status?: StatusPemilihan;
  startTime?: string;
  endTime?: string;
}
