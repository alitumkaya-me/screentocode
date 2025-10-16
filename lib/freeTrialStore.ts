// Free trial system with localStorage
const STORAGE_KEY = 'screen-to-code-trial'
const MAX_FREE_USES = 3

interface TrialData {
  remainingUses: number
  usedAt: string[]
}

export class FreeTrialManager {
  private static getTrialData(): TrialData {
    if (typeof window === 'undefined') {
      return { remainingUses: MAX_FREE_USES, usedAt: [] }
    }
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { remainingUses: MAX_FREE_USES, usedAt: [] }
    }
    
    try {
      return JSON.parse(stored)
    } catch {
      return { remainingUses: MAX_FREE_USES, usedAt: [] }
    }
  }

  private static saveTrialData(data: TrialData): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  static getRemainingUses(): number {
    return this.getTrialData().remainingUses
  }

  static canUseTrial(): boolean {
    return this.getRemainingUses() > 0
  }

  static decrementUse(): boolean {
    const data = this.getTrialData()
    if (data.remainingUses > 0) {
      data.remainingUses--
      data.usedAt.push(new Date().toISOString())
      this.saveTrialData(data)
      return true
    }
    return false
  }

  static resetTrial(): void {
    this.saveTrialData({ remainingUses: MAX_FREE_USES, usedAt: [] })
  }

  static getUsageHistory(): string[] {
    return this.getTrialData().usedAt
  }
}
