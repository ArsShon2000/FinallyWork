import React from "react";
import PropTypes from "prop-types";
import videojs from "video.js"
import offsetPlugin from "videojs-offset";

import "./video-js.css";

const DEFAULT_PLAYER_OPTIONS = {
  aspectRatio: "16:9",
  autoplay: false,
  controls: true,
  loop: false
};

export default class VideoPlayer extends React.Component {
  _refVideo = React.createRef();
  _player = null;

  static propTypes = {
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    start: PropTypes.number,
    end: PropTypes.number,
    currentTime: PropTypes.number,
    playerOptions: PropTypes.object
  };

  static defaultProps = {
    start: 0,
    end: 0,
    playerOptions: DEFAULT_PLAYER_OPTIONS
  };

  state = {
    isLoaded: false
  };

  render() {
    const { _refVideo } = this;

    return (
      <div data-vjs-player>
        <video ref={_refVideo} className="video-js" />
      </div>
    );
  }

  componentDidMount() {
    console.log("VideoPlayer >>> componentDidMount");
    this._initPlayer();
  }

  componentWillUnmount() {
    console.log("VideoPlayer >>> componentWillUnmount");
    this._disposePlayer();
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("VideoPlayer >>> componentDidUpdate");

    const {
      props: { start, end, autoplay, currentTime }
    } = this;
    const { start: prevStart, end: prevEnd } = prevProps;
    console.log("VideoPlayer >>> componentDidUpdate", {
      prevStart,
      prevEnd,
      start,
      end
    });

    if (start !== prevStart || end !== prevEnd) {
      await this.setOffset(start, end, currentTime, autoplay);
    }
  }

  _initPlayer = () => {
    if (this._player) return;

    const {
      _refVideo,
      onPlayerReady,
      props: { playerOptions }
    } = this;

    const options = {
      ...DEFAULT_PLAYER_OPTIONS,
      ...playerOptions,
      autoplay: false,
      loop: false
    };

    const version = videojs.getPluginVersion("offset");
    version || videojs.registerPlugin("offset", offsetPlugin);

    this._player = videojs(_refVideo.current, options, onPlayerReady);
    this._player.pause();
    this._player.on("loadstart", this.onLoadStart);
    this._player.on("loadedmetadata", this.onLoadedMetadata);
    // this._player.on("seeking", this.onSeek);
    // this._player.on("seeked", this.onSeek);
    this._player.on("ended", this.onEnded);
    // this._player.on("loadedmetadata", this.onLoadedMetadata);
  };

  _disposePlayer = () => {
    const { _player } = this;
    _player && _player.dispose();
    this._player = null;
  };

  onPlayerReady = () => {
    console.log(">>>>>> onPlayerReady", this._player);
    console.log("duration:", this._player.duration());
  };

  onLoadStart = (event, hashopt) => {
    console.log(">>> onLoadStart", event, hashopt);
    console.log("duration:", this._player.duration());
  };

  onLoadedMetadata = async (event, hashopt) => {
    console.log(">>> onLoadedMetadata", event, hashopt);
    console.log("duration:", this._player.duration());

    const {
      props: { start, end, autoplay, currentTime }
    } = this;
    this.setCurrent(start);
    await this.setOffset(start, end, currentTime, autoplay);
    // try {
    //   autoplay && this._player.play();
    // } catch (e) {
    //   console.error(e);
    // }
  };

  onEnded = () => {
    const {
      _player,
      props: { loop = false }
    } = this;
    console.log(">>> onEnded", { paused: _player.paused() });
    if (!loop) return;
    if (_player.paused()) _player.play();

    let ranges = _player.seekable();
    console.log(">>> onEnded ranges", {
      ranges,
      start: ranges.start(0),
      end: ranges.end(0)
    });
  };

  onSeek = (event, hashopt) => {
    const _eventType = (event && event.type) || "unknown event";
    console.log(`>>> ${_eventType}`, event, hashopt);
    console.log("currentTime:", this._player.currentTime());
  };

  onEvent = (event, hashopt) => {
    const _eventType = (event && event.type) || "unknown event";
    console.log(`>>> ${_eventType}`, event, hashopt);
  };

  setCurrent(time) {
    console.log(">>> setCurrent", time);
    const { _player } = this;
    const currentTime = _player.currentTime();
    console.log(">>> setCurrent", { currentTime, time });
    if (currentTime !== time) _player.currentTime(time);

    console.log(">>> setCurrent", _player);
  }

  // тут делаем позиционирование проигрывания
  async setOffset(start = 0, end = 0, currentTime = null, play = false) {
    const { _player } = this;

    const offsetOpts = {
      start: start || 0,
      end: end || _player.duration(),
      restart_beginning: true
    };
    console.log(">>> setOffset", offsetOpts);

    const currentOffset = {
      start: _player.startOffset && _player.startOffset(),
      end: _player.endOffset && _player.endOffset()
    };
    console.log(">>> setOffset currentOffset", currentOffset);

    // if (!currentOffset.start && !currentOffset.end) {
    //   offsetOpts.start && this.setCurrent(offsetOpts.start);
    // }

    // let ranges = _player.seekable();
    // console.log(">>> setOffset ranges", {
    //   ranges,
    //   start: ranges.start(0),
    //   end: ranges.end(0)
    // });

    // _player.pause();
    // console.log(">>> setOffset", { paused: _player.paused() });
    _player.offset(offsetOpts);
    await _pause(100);

    currentTime !== undefined &&
      currentTime !== null &&
      this.setCurrent(currentTime);

    play && _player.play();
    // this.setCurrent(11);

    // ranges = _player.seekable();
    // console.log(">>> setOffset ranges", {
    //   ranges,
    //   start: ranges.start(0),
    //   end: ranges.end(0)
    // });

    // console.log(">>> setOffset offset plugin", {
    //   start: _player.startOffset && _player.startOffset(),
    //   end: _player.endOffset && _player.endOffset()
    // });
  }
}

async function _pause(ms = 1000) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
  await promise;
}
