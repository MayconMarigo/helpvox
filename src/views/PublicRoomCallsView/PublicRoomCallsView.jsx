import Daily from "@daily-co/daily-js";
import CiclicLogo from "assets/svgs/CiclicLogo";
import { useEffect } from "react";
import { BASE_DAILY_JS_URL } from "utils/constants";
import { Header } from "./PublicRoomCallsView.styles";

export default function PublicRoomCallsView() {
  useEffect(() => {
    const name = window.location.search.split("&")[0].split("=")[1];
    const token = window.location.search.split("&")[1]?.split("=")[1];
    const returnUrl = window.location.search.split("&")[2]?.split("=")[1];

    if (!name || !token) return;

    const call = Daily.createFrame({
      url: name,
      iframeStyle: {
        width: "100%",
        height: "calc(100% - 6rem)",
        border: 0,
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    });
    const parent = document.getElementById("call-provider");
    parent.appendChild(call.iframe());

    call.on("left-meeting", () => {
      window.location.href = returnUrl;
    });

    call.join({
      url: `${BASE_DAILY_JS_URL}/${name}?t=${token}`,
    });
  }, []);

  return (
    <div style={{ height: "calc(100vh)", overflow: "hidden" }}>
      <Header>
        <CiclicLogo width={200} />
      </Header>
      <div id="call-provider" style={{ height: "100%" }}></div>
    </div>
  );
}
