import cron from 'node-cron';
import { getEmailList, sendEmailToLecturer } from './constructEmail';

export const task = cron.schedule('* * * * *', async () => {
  const list = await getEmailList();
  if (list.length) {
    list.forEach(async (lecturer)=>{
        // console.log('I have mail');
        // await sendEmailToLecturer(lecturer);
        // console.log('email sent');
    })
  }
});
