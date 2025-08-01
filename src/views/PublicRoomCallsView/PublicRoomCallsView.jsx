import Daily from "@daily-co/daily-js";
import CiclicLogo from "assets/svgs/CiclicLogo";
import { useEffect } from "react";
import { BASE_DAILY_JS_URL } from "utils/constants";
import { Header } from "./PublicRoomCallsView.styles";
import * as logo from "../../assets/imgs/logo-login.png";
import Image from "next/image";

export default function PublicRoomCallsView() {
  useEffect(() => {
    const name = window.location.search.split("&")[0].split("=")[1];
    const returnUrl = window.location.search.split("&")[2]?.split("=")[1];

    if (!name) return;

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
      window.location.href = returnUrl || "/login";
    });

    call.join({
      url: `${BASE_DAILY_JS_URL}/${name}`,
    });
  }, []);
  const LoginLogo = logo.default;

  return (
    <div style={{ height: "calc(100vh)", overflow: "hidden" }}>
      <Header>
        <Image
          src={LoginLogo}
          width={200}
          alt="login"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/login")}
        />
      </Header>
      <div id="call-provider" style={{ height: "100%" }}></div>
    </div>
  );
}
