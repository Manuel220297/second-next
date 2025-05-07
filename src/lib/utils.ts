import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEducationLevel(code: string): string {
  switch (code) {
    case 'Preschool':
      return 'Preschool Student';
    case 'Kindergarten':
      return 'Kindergarten Student';
    case 'Elementary-1':
      return 'Grade 1 Elementary School Student';
    case 'Elementary-2':
      return 'Grade 2 Elementary School Student';
    case 'Elementary-3':
      return 'Grade 3 Elementary School Student';
    case 'Elementary-4':
      return 'Grade 4 Elementary School Student';
    case 'Elementary-5':
      return 'Grade 5 Elementary School Student';
    case 'Elementary-6':
      return 'Grade 6 Elementary School Student';
    case 'JuniorHigh-1':
      return 'Grade 7 Senior High School';
    case 'JuniorHigh-2':
      return 'Grade 8 Senior High School';
    case 'JuniorHigh-3':
      return 'Grade 9 Senior High School';
    case 'JuniorHigh-4':
      return 'Grade 10 Senior High School';
    case 'SeniorHigh-1':
      return 'Grade 11 Senior High School';
    case 'SeniorHigh-2':
      return 'Grade 12 Senior High School';
    case 'Bachelor-1':
      return "1st Year Bachelor's Degree";
    case 'Bachelor-2':
      return "2nd Year Bachelor's Degree";
    case 'Bachelor-3':
      return "3rd Year Bachelor's Degree";
    case 'Bachelor-4':
      return "4th Year Bachelor's Degree";
    case 'Associate-1':
      return "1th Year Associate's Degree";
    case 'Associate-2':
      return "2nd Year Associate's Degree";
    default:
      return code;
  }
}

export function formatCourse(courseCode: string): string {
  if (courseCode) {
    return courseCode
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return 'No course';
}
