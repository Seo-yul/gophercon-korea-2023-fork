import useCountdown from "@/hooks/useCountdown";
import styled from "@emotion/styled";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dayjs from "dayjs";
import { gsap } from "gsap";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LocationContainer = styled.main({
  width: "100%",
  padding: "140px 0 80px 0",
  position: "relative",
});

const LocationInner = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  zIndex: 10,
});

const Globe = styled.div({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
});

const LocationMainSection = styled.section({
  width: "90%",
  maxWidth: 1440,
  padding: "0 80px",
  "@media (max-width: 1000px)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
});

const LocationTitle = styled.h1({
  margin: "0 0 40px",
  padding: 0,
  fontSize: 70,
  fontWeight: 900,
  border: 0,
});

const LocationDate = styled.h2({
  margin: 0,
  padding: 0,
  fontSize: 40,
  border: 0,
  color: "#9000FF",
});

const LocationAddressButton = styled.button({
  fontSize: 26,
  fontWeight: 600,
  marginBottom: 40,
  "@media (max-width: 1280px)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

const LocationAddressButtonCopied = styled.span({
  fontSize: 24,
  marginLeft: 20,
  fontWeight: 600,
  backgroundColor: "#0029FF",
  padding: "8px 16px",
  color: "#fff",
  borderRadius: "0 16px 16px 16px",
  "@media (max-width: 1000px)": {
    display: "block",
    maxWidth: "80%",
    marginTop: 20,
    marginLeft: 0,
  },
});

const LocationAddressButtonCopyMessage = styled(LocationAddressButtonCopied)({
  backgroundColor: "#fafafa",
  color: "#000",
});

const CounterGroup = styled.div({
  display: "flex",
  marginTop: 20,
  fontWeight: 600,
  gap: 80,
});
const Counter = styled.div({
  MozOutlineWidthidth: 120,
  height: 200,
  textAlign: "center",
});
const CounterValue = styled.p({
  fontSize: 70,
  fontWeight: 900,
  marginBottom: 10,
  background: "linear-gradient(45deg, #BD00FF, #0066FF)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  lineHeight: 1.5,
  textShadow: "0 6px 12px rgba(0, 32, 255, .25)",
});
const CounterUnit = styled.p({
  fontSize: 30,
  fontWeight: 700,
  background: "linear-gradient(45deg, #0045dd, #00d299)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  textShadow: "0 3px 6px rgba(0, 163, 255, .25)",
  lineHeight: 1.5,
});

const DATE = dayjs("2023-08-05 10:00", "YYYY-MM-DD HH:mm").toDate();
const Location = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isThreeLoaded, setIsThreeLoaded] = useState<boolean>(false);
  const daysRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const [days, hours, minutes, seconds] = useCountdown(DATE);

  const TRIGGER = {
    day: daysRef.current,
    hour: hoursRef.current,
    minute: minutesRef.current,
    second: secondsRef.current,
  };

  const tickAnimation = (trigger: keyof typeof TRIGGER) => {
    let tl = gsap.timeline();
    tl.to(TRIGGER[trigger], {
      duration: 0.1,
      y: -10,
      ease: "power1.inOut",
    }).to(TRIGGER[trigger], {
      duration: 0.1,
      y: 0,
      ease: "power1.inOut",
    });
  };

  const onCopyHandler = () => {
    setCopied(true);
  };

  useEffect(() => {
    tickAnimation("day");
  }, [days]);

  useEffect(() => {
    tickAnimation("hour");
  }, [hours]);

  useEffect(() => {
    tickAnimation("minute");
  }, [minutes]);

  useEffect(() => {
    tickAnimation("second");
  }, [seconds]);

  const onLoadThree = () => {
    setIsThreeLoaded(true);
  };

  const onLoadVanta = () => {
    VANTA.GLOBE({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.2,
      scaleMobile: 1.0,
      color: "#0029ff",
      backgroundColor: "#f2f2ff",
    });
  };

  return (
    <LocationContainer>
      <Globe id='vanta'></Globe>
      <Script type='text/javascript' src='/scripts/three.min.js' onLoad={onLoadThree} />
      {isThreeLoaded && <Script type='text/javascript' src='/scripts/vanta.globe.min.js' onLoad={onLoadVanta} />}
      <LocationInner>
        <LocationMainSection>
          <LocationTitle>
            GopherCon Korea
            <br />
            2023
          </LocationTitle>
          <LocationDate>2023.08.05-06</LocationDate>
          <CopyToClipboard text='서울특별시 광진구 능동로 209' onCopy={onCopyHandler}>
            <LocationAddressButton>
              <span>서울특별시 광진구 능동로 209, 세종대학교 대양 AI 센터 (12층)</span>
              {copied ? (
                <LocationAddressButtonCopied>복사됨!</LocationAddressButtonCopied>
              ) : (
                <LocationAddressButtonCopyMessage>이곳을 클릭해서 주소 복사하기</LocationAddressButtonCopyMessage>
              )}
            </LocationAddressButton>
          </CopyToClipboard>
        </LocationMainSection>

        <div className='mt-4 flex w-full justify-center'>
          <AddToCalendarButton
            label='내 캘린더에 일정 추가하기'
            name='GopherCon Korea 2023'
            description='안녕하세요, Golang Korea입니다.
    2023년 여름, Go 언어 사용자들의 최대 행사인 GopherCon이 한국에서 처음으로 개최됩니다! 🎉

    이번 GopherCon Korea 2023의 주제는 "Go In Depth"로 그동안 미처 살펴보지 못했던 Go 언어의 활용법과 내부를 들여다 볼 수 있다는 다양한 세션이 준비되어 있습니다.'
            startDate='2023-08-05'
            startTime='10:00'
            endDate='2023-08-06'
            endTime='18:00'
            timeZone='Asia/Seoul'
            location='서울특별시 광진구 능동로 209, 세종대학교 대양 AI 센터 (12층)'
            options="'Apple','Google','iCal','Outlook.com','Microsoft365'"
            buttonStyle='3d'
            listStyle='overlay'
          />
        </div>
        <CounterGroup>
          <Counter ref={daysRef}>
            <CounterValue>{days}</CounterValue>
            <CounterUnit>DAY</CounterUnit>
          </Counter>
          <Counter ref={hoursRef}>
            <CounterValue>{hours}</CounterValue>
            <CounterUnit>HOURS</CounterUnit>
          </Counter>
          <Counter ref={minutesRef}>
            <CounterValue>{minutes}</CounterValue>
            <CounterUnit>MINUTES</CounterUnit>
          </Counter>
          <Counter ref={secondsRef}>
            <CounterValue>{seconds}</CounterValue>
            <CounterUnit>SECONDS</CounterUnit>
          </Counter>
        </CounterGroup>
      </LocationInner>
    </LocationContainer>
  );
};

export default Location;
