import axios from "axios";
import { ScheduledEvent, User } from "../../types/agendamento";

const BASE_URL =
  "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1";

export const agendamentoApiService = {
  async fetchUser(token: string): Promise<User> {
    const url = `${BASE_URL}/usuario/login`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const response = await axios.post(url, { token }, { headers });
    return response.data;
  },
  async fetchScheduledEvents(spaceId: number): Promise<ScheduledEvent[]> {
    const url = `${BASE_URL}/usuario-space/listar-por-space-id?spaceId=${spaceId}`;
    const response = await axios.get(url);
    return response.data;
  },
  async postScheduling(payload: any): Promise<void> {
    const url = `${BASE_URL}/usuario-space/salvar`;
    await axios.post(url, payload);
  },
};
