import { ref } from 'vue'

export function useTimer() {
  const time = ref(0)
  const interval = ref<number | undefined>(undefined)

  function startTimer() {
    resetTimer()
    interval.value = setInterval(() => {
      time.value++
    }, 1000)
  }
  function stopTimer() {
    clearInterval(interval.value)
  }

  function resetTimer() {
    clearInterval(interval.value)
    interval.value = undefined
    time.value = 0
  }

  return { time, startTimer, stopTimer, resetTimer }
}
