export type Root = Courses[]

export interface Courses {
  id?: string
  id_usuario: string
  name: string
  description: string
  durationTime: string
  state: number
}
export interface CourseTable{
  id: string
  name: string
  durationTime: string
  state: string
}