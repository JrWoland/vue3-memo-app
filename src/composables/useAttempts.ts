import { ref } from 'vue'

export function useAttemps() {
  const attempts = ref(0)

  function incrementAttempts() {
    attempts.value++
  }

  function resetAttemps() {
    attempts.value = 0
  }

  return { attempts, incrementAttempts, resetAttemps }
}
