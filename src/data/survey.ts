import { DataSource, EntityManager, In } from 'typeorm';
import { join } from 'path';
import { Survey } from '../survey-module/survey.entity';

const surveySeedTemplate = (id: number) => {
  return {
    id,
    title: `휴가 때 가고싶은 해외여행 (${id})`,
    description: `
    본 설문은 다가올 휴가 때 가고싶은 해외여행을 묻는 설문입니다.
    작성하신 설문 내용은 통계법 33조(비밀의 보호)에 의거하여
    개인의 비밀에 대한 사항은 엄격히 보호됩니다.
    설문종료 후 기재되는 개인정보는 설문 응답여부에만 활용되며
    통계작성 이외의 목적으로는 사용되지 않습니다.
    `,
  };
};

export const SeedSurvey = async (connection: DataSource) => {
  const findedEntity = await connection.manager
    .getRepository(Survey)
    .find({ take: 4 });
  if (findedEntity.length > 0) return [];
  const ids = [1, 2, 3, 4];
  const seedData = ids.map((id) => surveySeedTemplate(id));
  return await connection.manager.getRepository(Survey).save(seedData);
};
