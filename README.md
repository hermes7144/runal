# 러닝알리미

## 프로젝트 소개
**러닝알리미는 마라톤과 러닝 이벤트 정보를 한 곳에서 제공하는 플랫폼입니다.**
러너들이 대회 정보를 지속적으로 확인해야 하는 번거로움과 대회 퀄리티에에 대한 불확실성을 해소하기 위해 이 프로젝트를 시작했습니다. 러닝알리미는 최신 이벤트를 빠르게 찾을 수 있도록 도와주며, 관심 있는 대회에 대한 맞춤 알림을 제공합니다. 이를 통해 러너들이 더 쉽게 대회를 준비하고, 자신에게 맞는 이벤트를 놓치지 않도록 지원합니다.

## 주요 특징
- 전국의 마라톤 이벤트 정보 제공
- 지역, 날짜, 거리 기준으로 대회 검색
- 관심 대회에 대한 알림 기능

## 주요 기능
1. **관심 이벤트 저장 및 알림 기능**  
- 사전에 등록한 조건에 맞는 이벤트를 알림 수신
- 특정 이벤트를 저장하고, 날짜가 다가오면 알림 수신  

2. **이벤트 검색 및 필터링**  
- 지역, 거리(10K, 하프 마라톤 등), 날짜로 대회를 검색 가능  
- 사용자는 관심 있는 이벤트만 빠르게 찾을 수 있음  

3. **이벤트 정보 상세 보기**  
- 등록비, 위치, 일정 등 세부 정보 제공  
- 외부 링크로 직접 참가 신청 가능

## 기술 스택
- React
- Zustand: 전역 상태 관리
#### 스타일링
- Tailwind CSS: 유틸리티 클래스 기반의 CSS 프레임워크로 빠르고 일관된 스타일링 제공.
- DaisyUI: Tailwind CSS 확장 라이브러리로 간편한 UI 컴포넌트 추가.
#### 백엔드 및 데이터 관리
- Firebase:
  - Firestore: 실시간 데이터베이스.
  - Authentication: 사용자 인증.
  - FCM: 푸시 알림 서비스.
  - Serverless Functions: 클라우드 기반의 서버리스 백엔드 구현.

- TanStack React Query: 서버 상태 관리와 데이터 패칭 최적화.
#### 빌드 도구
- Vite

## 설치 및 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/alrammate.git
cd alrammate
```
### 2. 의존성 설치
프로젝트 디렉토리로 이동한 후, 필요한 의존성 패키지를 설치합니다. npm 또는 yarn을 사용하여 설치할 수 있습니다.
```
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정
.env 파일을 생성하고, 필요한 환경 변수를 설정합니다. 예시:

```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

### 4. 개발 서버 실행
프로젝트를 로컬 서버에서 실행하려면 아래 명령어를 사용합니다.
```
npm run dev
# 또는
yarn dev
```
서버가 실행되면 브라우저에서 `http://localhost:5173` 주소로 접속할 수 있습니다.


## 스크린샷 (수요일 작성)
### 홈 화면
![image](https://github.com/user-attachments/assets/8f550cf7-124a-49f8-a24f-7f3e9736db47)  

사용자가 접속하면 볼 수 있는 메인 화면으로, 대회 목록과 필터링 옵션이 제공됩니다. 이 화면에서 사용자는 다양한 마라톤 이벤트를 확인할 수 있습니다.

### 로그인화면
![image](https://github.com/user-attachments/assets/65c2c116-b9dd-48c0-a763-ea2128ff719a)  

현재는 구글 로그인만 지원합니다.

### 알림 설정 화면
![image](https://github.com/user-attachments/assets/c0245805-216b-427b-8fb4-debdd0a9454a)  

로그인 하면 우측 상단의 원을 클릭하면 알림을 설정할 수 있는 메뉴가 나타납니다.

관심 있는 대회에 대한 알림을 설정할 수 있는 화면입니다. 특정 조건을 설정하여 대회 알림을 받을 수 있습니다.

![image](https://github.com/user-attachments/assets/d3474133-8917-4363-9e4a-b5534346cdea)  

대회 신청일 및 전날에 알림을 받고 싶다면 로그인 후에 대회의 종을 클릭하면 신청됩니다.

### 알림 받는 법
![KakaoTalk_20241217_211849855](https://github.com/user-attachments/assets/f396724d-651e-47b7-ac87-8e58fd774374)  

모바일 에서 로그인 시 기기 등록이 됩니다. 삼성인터넷을 제외한 브라우저에서는 상단의 내려받는 버튼을 클릭해서 앱 발행해야 정상적으로 알림이 등록되는거 같습니다. 제가 삼성말고 다른 기기가 없어서 브라우저 테스트는 아직 완벽하지 않습니다.  

#### 알림 예시
![image](https://github.com/user-attachments/assets/26a2a127-80b8-45e1-a817-97506f66d5aa)  
알림에는 대회명, 위치, 거리 및 이미지를 볼 수 있습니다.  

#### 삼성 인터넷 예시
![KakaoTalk_20241217_210605964_02](https://github.com/user-attachments/assets/015282d5-c080-4071-a729-72092e43a79f)

삼성 인터넷의 경우는 로그인 만으로 알림 확인했습니다.
