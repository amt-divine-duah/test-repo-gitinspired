import cron from 'node-cron';
import { getEmailList, sendEmailToLecturer } from './constructEmail';

export const task = cron.schedule('0 * * * *', async () => {
  const list = await getEmailList();
  list.forEach(async (lecturer) => {
    const { Assignment } = lecturer;
    for (let i = 0; i < Assignment.length; i++) {
      if (Assignment[i].students.length) {
        await sendEmailToLecturer(lecturer);
        break;
      } else console.log('not sent');
    }
  });
});
