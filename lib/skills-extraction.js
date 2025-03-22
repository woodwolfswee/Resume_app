const skillsList = ["JavaScript", "React", "AWS", "Python", "MongoDB", "Node.js", "Java", "Python", "C++", "Ruby", "Go", "Next JS"]; // Expand this

function extractSkills(text) {
  return skillsList.filter(skill => text.includes(skill));
}
