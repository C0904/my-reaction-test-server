import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionTestService {
  private globalBestTime: number | null = null;
  private globalBestName: string | null = null;

  getGlobalBest() {
    return { time: this.globalBestTime, name: this.globalBestName };
  }

  updateGlobalBest(time: number, name: string) {
    if (this.globalBestTime === null || time < this.globalBestTime) {
      this.globalBestTime = time;
      this.globalBestName = name;
      return true;
    }
    return false;
  }
}
