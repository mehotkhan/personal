/* eslint-disable prettier/prettier */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
(function () {
  // const Gun = typeof window !== "undefined" ? window.Gun : require("gun");

  Gun.on("opt", function (root) {
    this.to.next(root);
    const opt = root.opt;
    if (root.once) {
      return;
    }
    if (!Gun.Mesh) {
      return;
    }
    if (opt.RTCPeerConnection === false) {
      return;
    }

    let env;
    if (typeof window !== "undefined") {
      env = window;
    }
    if (typeof global !== "undefined") {
      env = global;
    }
    env = env || {};

    const rtcpc =
      opt.RTCPeerConnection ||
      env.RTCPeerConnection ||
      env.webkitRTCPeerConnection ||
      env.mozRTCPeerConnection;
    const rtcsd =
      opt.RTCSessionDescription ||
      env.RTCSessionDescription ||
      env.webkitRTCSessionDescription ||
      env.mozRTCSessionDescription;
    const rtcic =
      opt.RTCIceCandidate ||
      env.RTCIceCandidate ||
      env.webkitRTCIceCandidate ||
      env.mozRTCIceCandidate;
    if (!rtcpc || !rtcsd || !rtcic) {
      return;
    }
    opt.RTCPeerConnection = rtcpc;
    opt.RTCSessionDescription = rtcsd;
    opt.RTCIceCandidate = rtcic;
    opt.rtc = opt.rtc || {
      iceServers: [
        {
          urls: "turn:154.91.170.15:3478",
          username: "turnuser",
          credential: "turn456",
        },
        /*      { urls: "stun:stun.sipgate.net:3478" },
            {urls: "stun:stun.stunprotocol.org"},
            {urls: "stun:stun.sipgate.net:10000"},
            {urls: "stun:217.10.68.152:10000"},
            {urls: 'stun:stun.services.mozilla.com'} */
      ],
    };
    // TODO: Select the most appropriate stuns.
    // FIXME: Find the wire throwing ICE Failed
    // The above change corrects at least firefox RTC Peer handler where it **throws** on over 6 ice servers, and updates url: to urls: removing deprecation warning
    opt.rtc.dataChannel = opt.rtc.dataChannel || {
      ordered: false,
      maxRetransmits: 2,
    };
    opt.rtc.sdp = opt.rtc.sdp || {
      mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: false },
    };
    opt.announce = function (to) {
      root.on("out", { rtc: { id: opt.pid, to } }); // announce ourself
    };
    const mesh = (opt.mesh = opt.mesh || Gun.Mesh(root));
    root.on("create", function (at) {
      this.to.next(at);
      setTimeout(opt.announce, 1);
    });
    root.on("in", function (msg) {
      if (msg.rtc) {
        open(msg);
      }
      this.to.next(msg);
    });

    function open(msg) {
      const rtc = msg.rtc;
      let peer;
      let tmp;
      if (!rtc || !rtc.id) {
        return;
      }
      delete opt.announce[rtc.id]; /// remove after connect
      if ((tmp = rtc.answer)) {
        if (!(peer = opt.peers[rtc.id] || open[rtc.id]) || peer.remoteSet) {
          return;
        }
        tmp.sdp = tmp.sdp.replace(/\\r\\n/g, "\r\n");
        return peer.setRemoteDescription(
          (peer.remoteSet = new opt.RTCSessionDescription(tmp))
        );
      }
      if ((tmp = rtc.candidate)) {
        peer =
          opt.peers[rtc.id] || open[rtc.id] || open({ rtc: { id: rtc.id } });
        return peer.addIceCandidate(new opt.RTCIceCandidate(tmp));
      }
      // if(opt.peers[rtc.id]){ return }
      if (open[rtc.id]) {
        return;
      }
      (peer = new opt.RTCPeerConnection(opt.rtc)).id = rtc.id;
      const wire = (peer.wire = peer.createDataChannel(
        "dc",
        opt.rtc.dataChannel
      ));
      open[rtc.id] = peer;
      wire.onclose = function () {
        delete open[rtc.id];
        mesh.bye(peer);
        // reconnect(peer);
      };
      wire.onerror = function (err) { };
      wire.onopen = function (e) {
        // delete open[rtc.id];
        mesh.hi(peer);
      };
      wire.onmessage = function (msg) {
        if (!msg) {
          return;
        }
        mesh.hear(msg.data || msg, peer);
      };
      peer.onicecandidate = function (e) {
        // source: EasyRTC!
        if (!e.candidate) {
          return;
        }
        root.on("out", {
          "@": msg["#"],
          rtc: { candidate: e.candidate, id: opt.pid },
        });
      };
      peer.ondatachannel = function (e) {
        const rc = e.channel;
        rc.onmessage = wire.onmessage;
        rc.onopen = wire.onopen;
        rc.onclose = wire.onclose;
      };
      if ((tmp = rtc.offer)) {
        rtc.offer.sdp = rtc.offer.sdp.replace(/\\r\\n/g, "\r\n");
        peer.setRemoteDescription(new opt.RTCSessionDescription(tmp));
        peer.createAnswer(
          function (answer) {
            peer.setLocalDescription(answer);
            root.on("out", {
              "@": msg["#"],
              rtc: { answer, id: opt.pid },
            });
          },
          function () { },
          opt.rtc.sdp
        );
        return;
      }
      peer.createOffer(
        function (offer) {
          peer.setLocalDescription(offer);
          root.on("out", { "@": msg["#"], rtc: { offer, id: opt.pid } });
        },
        function () { },
        opt.rtc.sdp
      );
      return peer;
    }
  });
  const noop = function () { };
})();
