export const getTherapy = (key: string) => {
  const therapies = {
    "0": "Vision Therapy",
    "1": "Speech Therapy",
    "2": "Occupational Therapy",
    "3": "Play & Art Therapy",
    "4": "Counselling",
    "5": "Clinical Psycology",
    "6": "Special Education",
    "7": "Vocational Training",
  };
  //@ts-ignore
  return therapies[key];
};
