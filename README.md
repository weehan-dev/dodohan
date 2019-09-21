# 두두한 매칭

-   CSV를 가지고 DB에 참가자를 넣는다
-   이름, 위한 아이디 혹은 좋아요 누른 페이스북 계정 링크, 카카오톡 아이디, 이메일, 휴대폰 번호를 입력받음

## 기획

-   참가자 확인 절차
    -   위한 맴버가 맞는가?
    -   타대생은 별 다른 확인 절차는 없음. 위한 페이지, 한대전 좋아요 정도
-   미팅 타입 확인
    -   3:3
    -   1:1 / 2:2는 나중에 확장
-   매칭 조건 확인
    -   나이대
-   우선순위
    -   위한 페이지 좋아요 1점
    -   한대전 페이지 좋아요 1점
-   알림
    -   문자메시지 알림
    -   메일 알림 (2순위)

## 프로젝트 구조

> 폴더 구조나 설정이 추가되거나 수정되면 여기에도 적어주세요

-   csv: csv 파일을 저장 (개인정보가 올라갈 위험이 있어서 .gitignore 했음. 본인이 직접 만들어야 함, 다른 파일이 없어야 함)
    -   others: 다른 대학교 신청자 (안에 csv파일이 있음)
    -   weehan: 위한 신청자 (안에 csv파일이 있음)
-   config: .env 설정을 한 곳에서만 호출함
-   models: 스키마 하나를 사용한 로직들
    -   schema: 스키마를 정의
-   services: 주요 로직들
-   loaders: 앱 시작 하면서 불러와야 하는 것들
-   utils: 로직 중에 사용되는 유틸들
-   weehanField.json: 위한 신청자 csv 필드
-   othersField.json: 다른 대학 신청자 csv 필드
-   index.js: 진입점
-   app.js: 로직이 시작되는 부분
