// src/services/userEvent.service.ts
import { UserEventRepository } from '../repositories/userEvent.repository';

export class UserEventService {
  static async getApprovedEvents() {
    return await UserEventRepository.getApprovedEvents();
  }
}
