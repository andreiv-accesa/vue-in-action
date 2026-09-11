export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  text: string
  priority: Priority
  isCompleted: boolean
}
