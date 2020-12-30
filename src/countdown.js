/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import ClockCountDown from './clock';


const Clock = props => {
  const {
    secondsInput,
    widthInput,
  } = props;

  const convertSecondsToMinutes = secInput => {
    if (secInput === 0 || secInput < 0) {
      return {
        _minutes: '00',
        _seconds: '00'
      };
    }
    let _secInput = secInput;
    const _minutes =
      parseInt(_secInput / 60, 10) < 10
        ? `0${parseInt(_secInput / 60, 10)}`
        : parseInt(_secInput / 60, 10);
    // secondxs %= 60;
    _secInput = parseInt(_secInput, 10) % 60;
    const _seconds = _secInput < 10 ? `0${_secInput}` : _secInput;
  
    return {
      _minutes,
      _seconds
    };
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [percent, setPercent] = useState(100);

  const [startMoment] = useState(new Date().getTime());
  // eslint-disable-next-line no-unused-vars

  const calculateCurrentSecond = () => {
    const result =
      (secondsInput * 1000 - (new Date().getTime() - startMoment)) / 1000;
    return result > 0 ? result : 0;
  };

  const currentSecond = calculateCurrentSecond();

  const calculatePercent = fullSeconds => {
    const result =
      ((secondsInput * 1000 - (new Date().getTime() - startMoment)) /
        1000 /
        fullSeconds) *
      100;
    return result >= 0 ? result : 0;
  };

  const handleNumberWhenTimeChange = () => {
    setMinutes(convertSecondsToMinutes(Math.ceil(currentSecond))._minutes);
    setSeconds(convertSecondsToMinutes(Math.ceil(currentSecond))._seconds);
    setPercent(calculatePercent(secondsInput));
  };

  const handleTimeCountDown = () => {
    handleNumberWhenTimeChange();
  };

  useEffect(() => {
    setMinutes(convertSecondsToMinutes(Math.ceil(currentSecond))._minutes);
    setSeconds(convertSecondsToMinutes(Math.ceil(currentSecond))._seconds);
  }, [secondsInput]);

  useEffect(() => {
    const timer = setTimeout(
      () => handleTimeCountDown(),
      10
    );

    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <ClockCountDown
      width={widthInput}
      percent={percent}
      initPercent={100}
      strokeColor='#52C41A'
      text={`${minutes}:${seconds}`}
    />
  );

  // return (
  //   <Progress
  //     width={widthInput}
  //     className={`clock ${stateOfTime}`}
  //     status="normal"
  //     percent={percent}
  //     type="circle"
  //     strokeColor={color}
  //     strokeLinecap="square"
  //     format={() => `${minutes}:${seconds}`}
  //   />
  // );
};

export default Clock;
