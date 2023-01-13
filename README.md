## 개발환경

- os: mac M1 Pro
- node version: v16.15.1
- npm version: 8.11.0
- postgresql version: 14.6 (Homebrew)
- nest-cli version: 9.0.0

## 요구사항

- 서버 포트는 4000으로 실행 o

- (내용) 객관식 설문지의 데이터 베이스 설계

  - 문항별 점수가 존재한다.
  - 설문지는 답변을 체크할 수 있다.
  - 답변의 총점을 확인할 수 있다.

- API 기능 구현

  - 설문지 CRUD o
  - 문항 CRUD o
  - 선택지 CRUD o
  - 답변 CRUD
  - 설문지 완료
  - 완료된 설문지 확인

- 에러 처리 o

  - 요청 실패 시 적절한 에러를 리턴해야 합니다.
  - 에러 응답에 제한은 없지만 일관되게 응답해야 합니다.

- 로그
  - 에러 및 특이사항 발생시 로그를 확인하여 대처할 수 있게 작성

## 공지사항

- entity 부모 엔티티 삭제 시 자식 엔티티도 같이 삭제됩니다. ( onDelete: true )

## 실행 방법

1. 개발환경과 버전을 맞춰주세요.
2. postgresql 유저, 데이터베이스를 생성합니다. (postgresql download 완료 상태라고 가정합니다.)

```
psql postgres   <-- 터미널을 통해 postgresql에 접속합니다.
CREATE USER maum;  <-- 유저를 생성합니다.
ALTER USER maum PASSWORD '1234'; <-- 생성된 유저의 비밀번호를 1234로 설정합니다.
ALTER USER maum CREATEDB;  <-- maum 유저에게 데이터베이스 생성 권한을 부여합니다.
CREATE DATABASE survey; <-- 데이터베이스를 생성합니다.
```

3. .env 파일의 postgresql 변수를 설정합니다.

## 요구사항 해결

- 에러 처리

  - 요청 실패 시 적절한 에러를 리턴해야 합니다.

    1. BaseService를 통해 예측 가능한 에러를 throw하도록 처리했습니다.
    2. ExceptionFilter 인터페이스를 활용하여 gqlError와 query를 캐치하여 ApolloError를 핸들링 했습니다.
    3. class-validator의 경우 응답 에러의 stacktrace 프로퍼티를 제외시키고 메시지를 string으로 변경하여 리턴하도록 처리했습니다.

  - 에러 응답에 제한은 없지만 일관되게 응답해야 합니다.
    1. exception filter를 활용하여 일관되게 에러를 리턴하도록 하였습니다.

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
