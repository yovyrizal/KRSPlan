export function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function timesOverlap(a, b) {
  return a.day === b.day && timeToMinutes(a.startTime) < timeToMinutes(b.endTime) && timeToMinutes(b.startTime) < timeToMinutes(a.endTime)
}

export function findScheduleConflicts(courses) {
  const conflicts = []
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      if (timesOverlap(courses[i], courses[j])) conflicts.push([courses[i], courses[j]])
    }
  }
  return conflicts
}

export function totalWeeklyHours(courses) {
  const totalMinutes = courses.reduce((sum, c) => sum + (timeToMinutes(c.endTime) - timeToMinutes(c.startTime)), 0)
  return Math.round((totalMinutes / 60) * 10) / 10
}