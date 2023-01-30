# old-survey

## 개발환경

- os: mac M1 Pro
- node version: v16.15.1
- npm version: 8.11.0
- postgresql version: 14.6 (Homebrew)
- nest-cli version: 9.0.0

## 레이어드 아키텍처

![레이어드아키텍쳐](https://user-images.githubusercontent.com/106916440/215605959-3d41db96-3fce-41f1-b7aa-1d1671b92546.png)

## ERD

<img width="617" alt="nest-survey-erd" src="https://user-images.githubusercontent.com/106916440/215049191-068fdc6b-94a3-4463-8b95-d44ecf8d419a.png">

- survey : 설문지
- surveyQuestion : 설문지의 문항
- surveyQuestionOption : 문항의 선택지
- userSurvey : 유저가 참여한 설문지
- userResponse : 유저가 선택한 답변

## directory tree

```bash
src
│
├── common
│   ├── base-entity.ts
│   ├── base-service.ts
│   └── common.graphql.ts
│
├── config-module
│   ├── env.config.ts
│   ├── graphql.config.ts
│   ├── typeorm.config.ts
│   └── index.ts
│
├── data
│   ├── index.ts
│   ├── option.ts
│   ├── question.ts
│   └── survey.ts
│
├── filter
│   ├── gql-exception.filter.ts
│   └── query-exception.filter.ts
│
├── logger
│   └── logger.service.ts
│
├── survey-module
│   ├── survey.dto.ts
│   ├── survey.entity.ts
│   ├── survey.graphql
│   ├── survey.resolver.ts
│   ├── survey.service.ts
│   └── survey.module.ts
│
├── question-module
│   ├── question.dto.ts
│   ├── question.entity.ts
│   ├── question.graphql
│   ├── question.resolver.ts
│   ├── question.service.ts
│   └── question.module.ts
│
├── option-module
│   ├── option.dto.ts
│   ├── option.entity.ts
│   ├── option.graphql
│   ├── option.resolver.ts
│   ├── option.service.ts
│   └── option.module.ts
│
├── user-survey-module
│   ├── dto
│   │   ├── user-response.dto.ts
│   │   └── user-survey.dto.ts
│   │
│   ├── entity
│   │   ├── user-response.entity.ts
│   │   └── user-survey.entity.ts
│   │
│   ├── graphql
│   │   ├── user-response.graphql
│   │   └── user-survey.graphql
│   │
│   ├── resolver
│   │   ├── user-response.resolver.ts
│   │   └── user-survey.resolver.ts
│   │
│   ├── service
│   │   ├── user-response.service.ts
│   │   └── user-survey.service.ts
│   │
│   ├── service
│   │
│   └── user-survey.module.ts
│
└──── ...
```

## 실행 방법

1. 개발환경과 버전을 맞춰주세요.
2. postgresql 유저, 데이터베이스를 생성합니다. (postgresql download 완료 상태라고 가정합니다.)
3. .env 파일의 postgresql 변수를 설정합니다.
4. 터미널에서 명령을 실행합니다.

```
npm i
npm run start:dev
```
