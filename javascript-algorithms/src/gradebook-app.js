
function getAverage(scores) {
  const total = scores.reduce((acc, score) => acc + score, 0);
  return total / scores.length;
}

function getGrade(score) {
  let grade;
  if (score === 100) {
    grade = "A+";
  } else if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  return grade;
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(scores, score) {
  const average = getAverage(scores);
  const grade = getGrade(score);

  const result = hasPassingGrade(score) ? "passed" : "failed";

  return `Class average: ${average}. Your grade: ${grade}. You ${result} the course.`;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

console.log(getGrade(90));
console.log(hasPassingGrade(59));
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100));
