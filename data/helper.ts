import universities from './universities.json'
import polytechnics from './polytechnics.json'
import colleges from './colleges.json'
import states from './states.json'
import { InstitutionType } from '@/components/forms/qualification/schema'

export const institutions: Record<InstitutionType, string[]> = {
  university: universities.map(uni => uni.name),
  college: colleges.map(college => college.name),
  polytechnic: polytechnics
}

export const nigerianStates = states.map(state => state.state)

export const getLGAs = (stateName: string) => {
  const state = states.find(s => s.state === stateName)
  return state ? state.lgas : []
}
