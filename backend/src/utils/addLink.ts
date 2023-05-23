import getDownloadLink from './downloadFile';

interface Submission {
  snapshotName: string;
  link?: string;
}

interface Student {
  id: number;
  studentId: string;
  assignmentId: number;
  status: boolean;
  sent: boolean;
  student: {
    firstName: string;
    lastName: string;
  };
  Submissions: Submission[];
}

interface Assignment {
  id: number;
  title: string;
  deadline: string;
  description: string;
  course: string;
  lecturerId: string;
  uniqueCode: string;
  isPublished: boolean;
  updatedAt: string;
  students: Student[];
}

export default async function addLinkToSubmissions(obj) {
  if (obj && obj.students && obj.students.length > 0) {
    for (const student of obj.students) {
      if (student.Submissions && student.Submissions.length > 0) {
        for (const submission of student.Submissions) {
            const link = await getDownloadLink(submission.snapshotName)
          submission.link = link[0];
        }
      }
    }
  }

  return obj;
}

