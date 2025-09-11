import Daily from "@daily-co/daily-js";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { BASE_DAILY_JS_URL } from "utils/constants";
import * as logo from "../../assets/imgs/logo-kof.png";
import { Header } from "./PublicRoomCallsView.styles";

export default function PublicRoomCallsView() {
  const { user } = useUser();

  useEffect(() => {
    const name = window.location.search.split("&")[0].split("=")[1];
    const token = window.location.search.split("&")[1].split("=")[1];
    const returnUrl = window.location.search.split("&")[2]?.split("=")[1];

    if (!name || !token) return;

    const call = Daily.createFrame({
      url: name,
      iframeStyle: {
        width: "100%",
        height: "calc(100% - 6rem)",
        border: 0,
        backgroundColor: "#ff1922",
        color: "#ff1922",
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    });

    call.setTheme({
      colors: {
        accent: "#ff1922",
        accentText: "#fff",
        mainAreaBg: "#ff1922",
      },
    });
    const parent = document.getElementById("call-provider");
    parent.appendChild(call.iframe());

    call.on("left-meeting", () => {
      if (user.userTypeId == "4") {
        window.location.replace(`/authenticated/calls/rating?callId=${name}`);
        return;
      }

      window.location.replace("/authenticated/attendance");
    });

    call.join({
      url: `${BASE_DAILY_JS_URL}/${name}?t=${token}`,
    });
  }, []);
  const LoginLogo = logo.default;

  return (
    <div style={{ height: "calc(100vh)", overflow: "hidden" }}>
      <Header>
        {user && (
          <img
            src={
              user.userTypeId == "3"
                ? LoginLogo.src
                : user?.logoImage
                ? user?.logoImage
                : LoginLogo.src
            }
            width={150}
            height="auto"
            alt="login"
            style={{ cursor: "pointer", maxHeight: "80%" }}
            onClick={() => (window.location.href = "/login")}
          />
        )}
      </Header>
      <div id="call-provider" style={{ height: "100%" }}></div>
    </div>
  );
}
