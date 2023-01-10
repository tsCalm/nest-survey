## 개발환경

- os: mac M1 Pro
- node version: v16.15.1
- npm version: 8.11.0
- postgresql version: 14.6 (Homebrew)
- nest-cli version: 9.0.0

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
