import Hamburguer from "assets/svgs/Hamburguer";
import ListItemsWithAnimation from "components/ListItemsWithAnimation";
import { navItems } from "config/sideNavigationLinks";
import { useCallingCall } from "contexts/CallingModal/CallingModal";
import { useCompanySocketObjects } from "contexts/CompanySocketObjects/CompanySocketObjects";
import { useSocket } from "contexts/Socket/Socket";
import { useUser } from "contexts/User/User";
import { useCallback, useEffect, useState } from "react";
import { AuthenticationService } from "services/authentication";
import { loadCompanySocketEvents } from "services/socket";
import Badge from "shared/Badge/Badge";
import StyledButton from "shared/Button";
import FloatContent from "shared/FloatContent/FloatContent";
import {
  CloseIconContainer,
  ContentBody,
  ContentContainer,
  ContentHeader,
  CredentialsContainer,
  HamburguerContainer,
  HeaderImage,
  LayoutContainer,
  LeftContent,
  MobileContainer,
  MobileHeaderContainer,
  NavigatorBody,
  NavigatorContainer,
  NavigatorHeader,
  RightContent,
} from "./AuthenticatedLayout.styles";

import * as logo from "../../assets/imgs/logo-bemmais.png";

const AuthenticatedLayout = ({ children }) => {
  const { user } = useUser();
  const image = logo.default;

  const { setPositionOnQueue, setRedirectToRoom, setCallObject } =
    useCompanySocketObjects();
  const { setModal, isOnline, setIsOnline } = useCallingCall();

  useEffect(() => {
    if (user == null) return;
    if (user) return;

    return (window.location.href = "/login");
  }, [user]);

  const [selected, setSelected] = useState("");
  const handleSelect = (e) => setSelected(e.target.text);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenFloatingContent = () => setIsOpen((previous) => !previous);

  const handleChangeStatus = () => {
    setIsOnline((previous) => !previous);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isOnline]);

  const isAgent = user?.type == "agent";

  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  const handleToogleHeader = () => setIsNavigatorOpen((previous) => !previous);

  const HandleLogo = useCallback(() => {
    const logos = {
      true: (
        <CloseIconContainer onClick={handleToogleHeader}>X</CloseIconContainer>
      ),
      false: (
        <HamburguerContainer onClick={handleToogleHeader}>
          <Hamburguer />
        </HamburguerContainer>
      ),
    };

    return logos[isNavigatorOpen];
  }, [isNavigatorOpen]);

  useEffect(() => {
    setIsNavigatorOpen(false);
  }, [window.location.href]);

  const handleLogout = async () => await AuthenticationService.logout();

  return (
    <>
      {user && user.type !== "worker" ? (
        <LayoutContainer>
          <NavigatorContainer>
            <NavigatorHeader isNavigatorOpen={isNavigatorOpen}>
              <MobileHeaderContainer>
                <HeaderImage
                  src={user?.logoImage ? user.logoImage : image.src}
                />
                <HandleLogo />
              </MobileHeaderContainer>
              <MobileContainer isNavigatorOpen={isNavigatorOpen}>
                {navItems[user.type]?.map((collapsible) => (
                  <ListItemsWithAnimation
                    selected={selected}
                    handleSelect={handleSelect}
                    key={collapsible.id}
                    title={collapsible.title}
                    icon={collapsible.icon}
                    list={collapsible?.subMenus}
                  />
                ))}

                <StyledButton
                  text="Sair da conta"
                  type="button"
                  onClick={handleLogout}
                  style={{ backgroundColor: "#fff", color: "#000" }}
                />
              </MobileContainer>
            </NavigatorHeader>
            <NavigatorBody>
              <div>
                {navItems[user.type]?.map((collapsible) => (
                  <ListItemsWithAnimation
                    selected={selected}
                    handleSelect={handleSelect}
                    key={collapsible.id}
                    title={collapsible.title}
                    icon={collapsible.icon}
                    list={collapsible?.subMenus}
                  />
                ))}
              </div>
              <StyledButton
                text="Sair da conta"
                type="button"
                onClick={handleLogout}
                style={{ backgroundColor: "#fff", color: "#000" }}
              />
            </NavigatorBody>
          </NavigatorContainer>
          <ContentContainer>
            <ContentHeader spacing={isAgent}>
              {isAgent && (
                <LeftContent onClick={handleOpenFloatingContent}>
                  {/* <h4>
                    Status:{" "}
                    <span style={{ color: isOnline ? "green" : "red" }}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </h4> */}
                  <FloatContent isOpen={isOpen}>
                    {/* <span onClick={handleChangeStatus}>
                      {isOnline ? "Offline" : "Online"}
                    </span> */}
                  </FloatContent>
                </LeftContent>
              )}
              <RightContent>
                <Badge name={user?.name || "AN"} />
                <CredentialsContainer>
                  <p style={{ color: "#fff" }}>
                    {user?.type == "company"
                      ? "Empresa"
                      : user?.type == "admin"
                      ? "Admin"
                      : user?.type == "worker"
                      ? "Funcionário"
                      : "Intérprete"}
                  </p>
                  <h5 style={{ color: "#fff" }}>{user?.name}</h5>
                </CredentialsContainer>
              </RightContent>
            </ContentHeader>
            <ContentBody>{children}</ContentBody>
          </ContentContainer>
        </LayoutContainer>
      ) : (
        children
      )}
    </>
  );
};

export default AuthenticatedLayout;
