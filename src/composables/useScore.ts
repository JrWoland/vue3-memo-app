import { ref } from 'vue'

export function useScore() {
  const attempts = ref(0)
  const time = ref(0)

  function incrementAttempts() {
    attempts.value++
  }

  function resetScore() {
    attempts.value = 0
  }

  function startTimer() {}
  function stopTimer() {}

  return { attempts, time, incrementAttempts }
}
