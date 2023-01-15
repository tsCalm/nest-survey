import { DataSource } from 'typeorm';
import { SurveyQuestion } from '../question-module/question.entity';

const questionSeedTemplate = (
  title: string,
  order: number,
  survey_id: number,
) => {
  return {
    title,
    score: 5,
    order,
    survey_id,
  };
};

export const SeedQuestion = async (
  connection: DataSource,
  survey_id: number,
) => {
  // let connection = await getConnection();
  // 5문제
  const orders = [
    {
      title: '당신이 희망하는 해외여행 종류는?',
      order: 1,
    },
    {
      title: '당신이 희망하는 여행지는?',
      order: 2,
    },
    {
      title: '당신이 희망하는 여행 기간은?',
      order: 3,
    },
    {
      title: '당신은 국내여행보다 해외여행을 희망하시나요?',
      order: 4,
    },
    {
      title: '당신의 성별은?',
      order: 5,
    },
  ];
  const findedQuestion = await connection.manager
    .getRepository(SurveyQuestion)
    .find({
      where: {
        survey_id,
      },
    });
  if (findedQuestion.length > 0) return [];
  const seedData = orders.map((obj) =>
    questionSeedTemplate(obj.title, obj.order, survey_id),
  );
  return await connection.manager.getRepository(SurveyQuestion).save(seedData);
};
