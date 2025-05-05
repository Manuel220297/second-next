import { createAdminClient } from '@/lib/server/appwrite';
import React from 'react';

interface Grade {
  $id: string;
  prelim: number;
  midterm: number;
  prefinal: number;
  final: number;
  students: {
    userId: string;
    name: string;
  };
  subjects: {
    name: string;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { databases } = await createAdminClient();

  const userId = id;
  let filteredGrades: Grade[] = [];

  try {
    const res = await databases.listDocuments(
      'student-project', // Database ID
      'gradeCollection' // Grades Collection ID
    );
    console.log(res.documents[0].students);

    const allGrades = res.documents as unknown as Grade[];

    // Filter on the server side
    filteredGrades = allGrades.filter((doc) => doc.students?.userId === userId);
  } catch (error) {
    console.error('Error fetching grades:', error);
  }

  return (
    <div>
      <h1>Grades for User ID: {userId}</h1>
      {filteredGrades.length === 0 ? (
        <p>No grades found.</p>
      ) : (
        filteredGrades.map((grade) => (
          <div key={grade.$id}>
            <h3>{grade.subjects.name}</h3>
            <p>Prelim: {grade.prelim}</p>
            <p>Midterm: {grade.midterm}</p>
            <p>Prefinal: {grade.prefinal}</p>
            <p>Final: {grade.final}</p>
          </div>
        ))
      )}
    </div>
  );
}
