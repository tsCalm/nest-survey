import { SurveyQuestionOption } from 'src/option-module/option.entity';
import { DataSource } from 'typeorm';
import { SurveyQuestion } from '../question-module/question.entity';

const dummyData = [
  {
    qOrder: 1,
    options: [
      {
        text: '패키지여행',
        order: 1,
      },
      {
        text: '자유여행',
        order: 2,
      },
      {
        text: '테마여행',
        order: 3,
      },
    ],
  },
  {
    qOrder: 2,
    options: [
      {
        text: '일본',
        order: 1,
      },
      {
        text: '중국',
        order: 2,
      },
      {
        text: '미국',
        order: 3,
      },
      {
        text: '태국',
        order: 3,
      },
      {
        text: '유럽',
        order: 3,
      },
    ],
  },
  {
    qOrder: 3,
    options: [
      {
        text: '1박2일',
        order: 1,
      },
      {
        text: '2박3일',
        order: 2,
      },
      {
        text: '3박4일',
        order: 3,
      },
      {
        text: '4박5일 이상',
        order: 3,
      },
    ],
  },
  {
    qOrder: 4,
    options: [
      {
        text: '예',
        order: 1,
      },
      {
        text: '아니요',
        order: 2,
      },
    ],
  },
  {
    qOrder: 5,
    options: [
      {
        text: '남자',
        order: 1,
      },
      {
        text: '여자',
        order: 2,
      },
    ],
  },
];
export const SeedOption = async (
  connection: DataSource,
  question: SurveyQuestion,
) => {
  // let connection = await getConnection();
  // 5문제

  const findedOption = await connection.manager
    .getRepository(SurveyQuestionOption)
    .find({
      where: {
        question_id: question.id,
      },
    });
  if (findedOption.length > 0) return [];
  const findObj = dummyData.find((obj) => obj.qOrder === question.order);
  const optionList = findObj.options.map((obj) => {
    return { ...obj, question_id: question.id };
  });
  return await connection.manager
    .getRepository(SurveyQuestionOption)
    .save(optionList);
};
