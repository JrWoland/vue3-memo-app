import { ref } from 'vue'

// enum GameLevel {
//   easy = 2,
//   normal = 6,
//   hard = 10,
// }

// type Level = keyof typeof GameLevel

const levelEasy = { timeout: 4000, items: 2, label: 'Easy' }
const levelNormal = { timeout: 3000, items: 6, label: 'Normal' }
const levelhard = { timeout: 2000, items: 10, label: 'Hard' }

export function useSettings() {
  const levelsList = [levelEasy, levelNormal, levelhard]

  const selectedLevel = ref(levelEasy)

  return { levelsList, selectedLevel }
}