import universities from './universities.json'
import polytechnics from './polytechnics.json'
import colleges from './colleges.json'

export const institutions = {
  university: universities.map(uni => uni.name),
  college: colleges.map(college => college.name),
  polytechnic: polytechnics
}
