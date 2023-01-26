## 개발환경

- os: mac M1 Pro
- node version: v16.15.1
- npm version: 8.11.0
- postgresql version: 14.6 (Homebrew)
- nest-cli version: 9.0.0

## 요구사항

- 서버 포트는 4000으로 실행

- (내용) 객관식 설문지의 데이터 베이스 설계

  - 문항별 점수가 존재한다.
    - SurveyQuestion Entity -> score가 문항별 점수입니다.
  - 설문지는 답변을 체크할 수 있다.
    - UserResponse Entity가 생성 시 유저가 답변했다고 판단합니다.
  - 답변의 총점을 확인할 수 있다.
    - Survey -> total_score는 시험지 총점을 의미합니다.
    - UserSurvey -> user_total_score는 유저 응답 총점을 의미합니다.

- API 기능 구현

  - 설문지 CRUD
    - query
      1. surveyList : 설문지 리스트를 리턴합니다. ( relations x )
      2. survey: 설문지 상세보기 ( relations o )
    - mutation
      1. createSurvey : 설문지 생성
      2. updateSurvey : 설문지 업데이트 (설문지의 이름, 설명, 인사말 업데이트)
      3. deleteSurvey : 설문지 삭제 ( 설문지의 문항과 보기가 전부 삭제됩니다.)
      4. completeSurvey : 설문지 작성을 완료하여 유저가 설문지에 응답할 수 있도록 합니다.
  - 문항 CRUD
    - query
      1. questionList : 문항 리스트를 리턴합니다. ( relations x )
      2. question: 문항 상세보기 ( relations o )
    - mutation
      1. createQuestion : 문항 생성
      2. updateQuestion : 문항 업데이트
      3. deleteQuestion : 설문지 삭제 ( 설문지의 문항과 보기가 전부 삭제됩니다.)
  - 선택지 CRUD
    - query
      1. optionList : 보기 리스트를 리턴합니다.
      2. option: 보기 상세보기
    - mutation
      1. createOption : 보기 생성
      2. updateOption : 보기 업데이트
      3. deleteOption : 보기 삭제
  - 답변 CRUD
    - query
      1. userResponseList : 유저 응답 리스트
      2. userResponse : 유저 응답
    - mutation
      1. saveUserSelectOption : 유저 응답 생성 및 저장
      2. deleteUserSelectOption : 유저 응답 삭제
  - 설문지 완료
    - completeSurvey : 설문지 생성 완료
    - completeUserSurvey : 유저 설문지 응답 완료
  - 완료된 설문지 확인
    - completeSurveyList : 작성 완료된 설문지 리스트
    - completedSurveyList : 유저 응답 완료된 설문지 리스트
    - completedSurvey : 유저 응답 완료 설문지 상세

- 에러 처리

  - 요청 실패 시 적절한 에러를 리턴해야 합니다.

    1. BaseService를 통해 예측 가능한 에러를 throw하도록 처리했습니다.
    2. ExceptionFilter 인터페이스를 활용하여 gqlError와 query를 캐치하여 ApolloError를 핸들링 했습니다.
    3. class-validator의 경우 응답 에러의 stacktrace 프로퍼티를 제외시키고 메시지를 string으로 변경하여 리턴하도록 처리했습니다.

  - 에러 응답에 제한은 없지만 일관되게 응답해야 합니다.

    1. exception filter를 활용하여 일관되게 에러를 리턴하도록 하였습니다.

  - 결과
    - <img width="300" height="300" alt="스크린샷 2023-01-13 오후 12 42 46" src="https://user-images.githubusercontent.com/106916440/212527660-628667ee-f25e-484d-ba2f-fe8fad6d20b5.png">
    - <img width="300" height="300" alt="스크린샷 2023-01-13 오후 12 42 46" src="https://user-images.githubusercontent.com/106916440/212527669-86d96f2f-850d-441c-a90b-b60920bc2276.png">
    - <img width="300" height="300" alt="스크린샷 2023-01-13 오후 12 42 46" src="https://user-images.githubusercontent.com/106916440/212527679-8c0172ca-3e01-4e50-9d90-0eb9c9e7f2ac.png">

- 로그

  - 에러 및 특이사항 발생시 로그를 확인하여 대처할 수 있게 작성

    1. error, warn 로그만 console.log 되도록 설정했습니다.

    ```
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });
    ```

    2. application이 Logger를 글로벌로 사용하도록 하였습니다.

    ```
      ...
      app.useLogger(new MyLogger());
    ```

## 실행 방법

1. 개발환경과 버전을 맞춰주세요.
2. postgresql 유저, 데이터베이스를 생성합니다. (postgresql download 완료 상태라고 가정합니다.)

```
psql postgres   <-- 터미널을 통해 postgresql에 접속합니다.
CREATE USER USER_NAME;  <-- 유저를 생성합니다.
ALTER USER maum PASSWORD '1234'; <-- 생성된 유저의 비밀번호를 1234로 설정합니다.
ALTER USER maum CREATEDB;  <-- maum 유저에게 데이터베이스 생성 권한을 부여합니다.
CREATE DATABASE survey; <-- 데이터베이스를 생성합니다.
```

3. .env 파일의 postgresql 변수를 설정합니다.

4. 터미널에서 명령을 실행합니다.

```
npm i
npm run start:dev
```

## 시나리오

1. 설문지, 문항, 보기 리스트를 생성합니다.
2. 설문지 생성 완료 요청을 보냅니다. (survey.is_complete= true)
3. 설문지 생성이 완료된 설문지에 설문 참가 요청을 보냅니다.
4. 설문지 응답을 완료한 후 유저 설문 응답 완료 요청을 보냅니다. (user_survey.is_complete = true)
5. 완료된 설문을 확인할 수 있습니다.

## 공지사항

- entity 부모 엔티티 삭제 시 자식 엔티티도 같이 삭제됩니다. ( onDelete: true )
- 설문지의 is_complete 컬럼이 true인 경우만 유저가 설문지에 응답할 수 있습니다.
- 설문지의 is_complete 컬럼이 true일 경우 수정 삭제가 불가능합니다.
- 유저 테이블은 따로 존재하지 않습니다. (유저는 이미 생성되어 있다고 가정합니다.)
