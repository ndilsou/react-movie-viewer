import React from 'react'

import './VideoIframe.css';

type VideoIframeProps = {
  src: string,
  title: string,
  aspectRatio: AspectRatio,
  allowFullScreen: boolean
}

export enum AspectRatio {OneByOne, SixteenByNine, FourByThree, ThreeByTwo, EightByFive}

const VideoIframe = ({src, title, aspectRatio = AspectRatio.SixteenByNine, allowFullScreen = true}: VideoIframeProps) => {
  let className: string
  switch (aspectRatio) {
    case AspectRatio.OneByOne:
      className = "video_wrapper-w1h1";
      break;
    case AspectRatio.SixteenByNine:
      className = "video_wrapper-w16h9";
      break;
    case AspectRatio.FourByThree:
      className = "video_wrapper-w4h3";
      break;
    case AspectRatio.ThreeByTwo:
      className = "video_wrapper-w3h2";
      break;
    case AspectRatio.EightByFive:
      className = "video_wrapper-w8h5";
      break;
    default:
      throw Error("Invalid aspect ratio")
  }
  return (
    <div className={className}>
          {
              <iframe
                title={title}
                width="100%" height="100%"
                src={src}
                allowFullScreen={allowFullScreen}
              >
              </iframe>
          }
        </div>
  )

}

export default VideoIframe
