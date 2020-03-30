import React from "react";
import styled from "styled-components";
import Timer from "react-compound-timer";

const TimerContainer = styled.div`
  width: 80%;
  height: 10%;
`;

function TimerBar(props) {
  return (
    <TimerContainer>
      <Timer>
        {({ resume, pause, reset }) => {
          if (props.restart === true) {
            reset();
            pause();
          }
          return (
            <>
              <Timer.Minutes
                formatValue={value => `${value}m :`}
              ></Timer.Minutes>
              <Timer.Seconds
                formatValue={value => ` ${value}s`}
              ></Timer.Seconds>
              <button onClick={pause}>Pause</button>
              <button onClick={resume}>Resume</button>
            </>
          );
        }}
      </Timer>
    </TimerContainer>
  );
}

export default TimerBar;
