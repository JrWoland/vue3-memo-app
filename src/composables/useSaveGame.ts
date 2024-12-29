// TODO: could be nice to use useLocalStorage compo
type GameResult = { date: string; time: number; attempts: number; level: string }

export function useSaveGame() {
  const MEMO_APP_STORAGE_KEY = 'memo-app-storage'
  const previousResults: GameResult[] = JSON.parse(
    localStorage.getItem(MEMO_APP_STORAGE_KEY) || '[]',
  )

  function saveResult(result: GameResult) {
    if (previousResults) {
      previousResults.push(result)
      localStorage.setItem(MEMO_APP_STORAGE_KEY, JSON.stringify(previousResults))
    } else {
      localStorage.setItem(MEMO_APP_STORAGE_KEY, JSON.stringify([result]))
    }
  }

  return { saveResult }
}
