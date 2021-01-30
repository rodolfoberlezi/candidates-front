export function parseTable(list) {
  const parsedList = list.map((candidate) => {
    return {
      key: candidate.id,
      city: candidate.city,
      experience: candidate.experience.replace(/years/, "anos"),
      techs: candidate.technologies.map((tech) => tech.name)
    }
  })

  return parsedList
}
