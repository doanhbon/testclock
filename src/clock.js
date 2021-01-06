import React, { useMemo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Clock = props => {
  const {
    strokeColor,
    width,
    percent,
    text,
    initPercent,
    colorStroke,
    strokeWidth,
    backgroundClock,
    textColor,
    textStrokeColor,
    textSize,
    textStrokeWidth
  } = props;
  const canvasRef = useRef();

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(' ');

    return d;
  };

  const cx = width * 0.5;
  const cy = width * 0.5;
  const radius = (width - strokeWidth) / 2;

  const displayBackgroudStroke = useMemo(() => {
    return (
      <path
        id="arc1"
        d={describeArc(cx, cy, radius, 0, 359.9999)}
        fill="none"
        stroke={colorStroke}
        strokeWidth={strokeWidth}
      />
    );
  }, [cx, cy, radius, colorStroke, strokeWidth]);

  const displayPercentStroke = () => {
    return (
      <path
        id="arc1"
        d={describeArc(
          cx,
          cy,
          radius,
          0,
          percent !== initPercent ? (360 / initPercent) * percent : 359.9999
        )}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    );
  };

  const displayBackgroundCircle = useMemo(() => {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="none"
        strokeWidth="0"
        fill={backgroundClock}
      />
    );
  }, [cx, cy, radius, backgroundClock]);

  const displayText = () => {
    return (
      <text
        x={cx}
        y={cy}
        fill={textColor}
        stroke={textStrokeColor}
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold"
        fontSize={textSize}
        strokeWidth={textStrokeWidth}
      >
        {text}
      </text>
    );
  };

  // useEffect(() => {
  //   // var canvas = document.getElementById("clockCanvas");
  //   const canvas = canvasRef.current;

  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(0, 0, width, width);
  //   ctx.lineWidth = strokeWidth;

  //   ctx.beginPath();
  //   ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  //   ctx.fillStyle = backgroundClock;
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  //   ctx.strokeStyle = colorStroke;
  //   ctx.stroke();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.arc(cx, cy, radius, -0.5 * Math.PI + (2 * (percent / 100) * Math.PI), - 0.5 * Math.PI, true);
  //   ctx.strokeStyle = strokeColor;
  //   ctx.stroke();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.lineWidth = textStrokeWidth;
  //   ctx.strokeStyle = textStrokeColor;
  //   ctx.font = `${textSize}px Roboto`;
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = 'middle';
  //   ctx.strokeText(text, width / 2, width / 2, width - 2 * strokeWidth);
  //   ctx.closePath();

  // }, 
  // [
  //   width,
  //   percent,
  //   strokeColor,
  //   strokeWidth,
  //   text,
  //   textSize,
  //   textStrokeColor,
  //   textStrokeWidth
  // ]);
  // {displayBackgroudStroke}
  // {displayPercentStroke()}
  // {displayBackgroundCircle}
  // {displayText()}
  return (
    <svg 
      width={width} 
      height={width} 
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ borderRadius: width / 2, overflow: 'hidden', position: 'relative' }}
    >
      {displayBackgroudStroke}
      {displayPercentStroke()}
      {displayBackgroundCircle}
      {displayText()}
    </svg>
  )
  // return (
  //   <canvas id="clockCanvas" width={width} height={width} ref={canvasRef} style={{ borderRadius: width / 2, overflow: 'hidden', position: 'relative' }}>
      
  //   </canvas>
  // );
};

export default Clock;

// const { strokeColor, width, percent, text, initPercent } = props;

Clock.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.number,
  percent: PropTypes.number,
  initPercent: PropTypes.number,
  text: PropTypes.string,
  colorStroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  backgroundClock: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  textStrokeColor: PropTypes.string,
  textStrokeWidth: PropTypes.number
};

Clock.defaultProps = {
  strokeColor: '#000000',
  width: 200,
  percent: 100,
  initPercent: 100,
  text: 'Clock',
  colorStroke: '#EEEEEE',
  strokeWidth: 20,
  backgroundClock: '#FFFFFF',
  textColor: '#FFFFFF',
  textSize: 25,
  textStrokeColor: '#000000',
  textStrokeWidth: 2
};
